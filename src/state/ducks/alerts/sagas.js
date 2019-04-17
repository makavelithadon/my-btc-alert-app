import { call, put, takeLatest } from "redux-saga/effects";
import { ADD_ALERT, DELETE_ALERT, UPDATE_ALERT } from "./types";
import {
  createAlertSuccess,
  deleteAlertSuccess,
  updateAlertSuccess
} from "./actions";
import { delay, getUniqID } from "utils";
import { stopSubmit } from "redux-form";

async function createAlert(alert) {
  //await delay(2000);
  return alert;
}

function* createAlertWorkerSaga({ payload: alert, resolve, reject }) {
  try {
    const res = yield call(createAlert, alert);
    yield put(createAlertSuccess({ ...res, id: getUniqID() }));
    yield put(stopSubmit("add-alert"));
    resolve(res);
  } catch (err) {
    console.error("error", err);
    yield put(stopSubmit("add-alert"));
    reject(err);
  }
}

async function deleteAlert(alert) {
  //await delay(2000);
  return alert;
}

function* deleteAlertWorkerSaga({ payload: alert }) {
  try {
    const res = yield call(deleteAlert, alert);
    yield put(deleteAlertSuccess(alert));
  } catch (err) {
    console.error("error", err);
  }
}

function updateAlert(alert) {
  //await delay(2000);
  return alert;
}

function* updateAlertWorkerSaga({ payload: alert, formId, resolve, reject }) {
  try {
    const res = yield call(updateAlert, alert);
    yield put(updateAlertSuccess(alert));
    yield put(stopSubmit(formId));
    resolve(alert);
  } catch (err) {
    console.error("err", err);
    yield put(stopSubmit(formId));
    reject(alert);
  }
}

export default function* assetsWatcherSaga() {
  yield takeLatest(ADD_ALERT, createAlertWorkerSaga);
  yield takeLatest(DELETE_ALERT, deleteAlertWorkerSaga);
  yield takeLatest(UPDATE_ALERT, updateAlertWorkerSaga);
}
