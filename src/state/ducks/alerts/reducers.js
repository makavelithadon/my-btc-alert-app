import {
  ADD_ALERT_SUCCESS,
  UPDATE_ALERT_SUCCESS,
  DELETE_ALERT_SUCCESS
} from "./types";
import { combineReducers } from "redux";

function byId(state = {}, action) {
  switch (action.type) {
    case ADD_ALERT_SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case UPDATE_ALERT_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload
        }
      };
    case DELETE_ALERT_SUCCESS:
      const byId = { ...state };
      delete byId[action.payload.id];
      return byId;
    default:
      return state;
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case ADD_ALERT_SUCCESS:
      return [...state, action.payload.id];
    case DELETE_ALERT_SUCCESS:
      return state.filter(alertId => alertId !== action.payload.id);
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  allIds
});
