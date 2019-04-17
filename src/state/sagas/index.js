import { all } from "redux-saga/effects";
import assets from "state/ducks/assets/sagas";
import alerts from "state/ducks/alerts/sagas";

const sagas = [assets, alerts];

export default function* rootSagas() {
  yield all(sagas.map(saga => saga && typeof saga === "function" && saga()));
}
