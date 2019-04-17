import {
  ADD_ALERT,
  ADD_ALERT_SUCCESS,
  UPDATE_ALERT,
  UPDATE_ALERT_SUCCESS,
  DELETE_ALERT,
  DELETE_ALERT_SUCCESS
} from "./types";

export const createAlert = (alert, resolve, reject) => {
  return { type: ADD_ALERT, payload: alert, resolve, reject };
};

export const createAlertSuccess = alert => ({
  type: ADD_ALERT_SUCCESS,
  payload: alert
});

export const updateAlert = (alert, formId, resolve, reject) => {
  return {
    type: UPDATE_ALERT,
    payload: alert,
    formId,
    resolve,
    reject
  };
};

export const updateAlertSuccess = alert => ({
  type: UPDATE_ALERT_SUCCESS,
  payload: alert
});

export const deleteAlert = alert => ({
  type: DELETE_ALERT,
  payload: alert
});

export const deleteAlertSuccess = alert => ({
  type: DELETE_ALERT_SUCCESS,
  payload: alert
});
