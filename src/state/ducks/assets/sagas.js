import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_ASSETS } from "./types";
import { fetchAssetsSuccess, fetchAssetsFailure } from "./actions";
import api from "api";

function filterAssetsByType(assets) {
  return assets.filter(asset => Number(asset.type_is_crypto) === 1);
}

function fetchAssets() {
  return api.assets.getAll();
}

function* assetWorkerSaga() {
  try {
    const assets = yield call(fetchAssets);
    yield put(fetchAssetsSuccess(filterAssetsByType(assets.slice(0, 50))));
  } catch (err) {
    console.error("error", err);
    yield put(fetchAssetsFailure(err));
  }
}

export default function* assetsWatcherSaga() {
  yield takeLatest(FETCH_ASSETS, assetWorkerSaga);
}
