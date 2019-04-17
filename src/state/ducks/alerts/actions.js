import {
  ADD_ALERT,
  ADD_ALERT_SUCCESS,
  EDIT_ALERT_SUCCESS,
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

export const editAlertSuccess = alert => ({
  type: EDIT_ALERT_SUCCESS,
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
