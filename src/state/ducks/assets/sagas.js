import { call, put, takeLatest, select } from "redux-saga/effects";
import { FETCH_ASSETS } from "./types";
import { fetchAssetsSuccess, fetchAssetsFailure } from "./actions";
import { getAllAlerts } from "state/ducks/alerts/selectors";
import api from "api";
import theme from "theme";

function filterAssetsByType(assets) {
  return assets.filter(asset => Number(asset.type_is_crypto) === 1);
}

function fetchAssets() {
  return api.assets.getAll();
}

async function fetchAlertsExchangesRates(alerts) {
  try {
    const exchangeRates = await Promise.all(
      alerts.map(({ asset_id: id }) =>
        api.exchangerate.getExchangeRate(id, "USD")
      )
    );
    exchangeRates
      .map((exchange, i) => ({
        exchange,
        alert: alerts[i]
      }))
      .forEach(({ alert, exchange: { rate } }) => {
        const { above, below } = alert;
        if (above && rate > above) {
          sendEmail(alert, "above");
        }
        if (below && rate < below) {
          sendEmail(alert, "below");
        }
      });
  } catch (err) {
    console.error("error", err);
  }
}

function sendEmail(alert, action = "above") {
  console.info(
    `%c Send email alert for ${alert.asset_id}, coin is ${action} ${
      alert[action]
    }`,
    `
      color: ${theme.colors.lightGreen};
      background-color: ${theme.colors.lightBlue};
    `
  );
}

function* assetWorkerSaga() {
  try {
    const assets = yield call(fetchAssets);
    const alerts = yield select(getAllAlerts);
    if (alerts.length) fetchAlertsExchangesRates(alerts);
    yield put(fetchAssetsSuccess(filterAssetsByType(assets.slice(0, 50))));
  } catch (err) {
    console.error("error", err);
    yield put(fetchAssetsFailure(err.response));
  }
}

export default function* assetsWatcherSaga() {
  yield takeLatest(FETCH_ASSETS, assetWorkerSaga);
}
