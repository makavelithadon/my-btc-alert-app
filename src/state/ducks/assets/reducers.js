import { combineReducers } from "redux";
import * as types from "./types";

function items(state = [], action) {
  switch (action.type) {
    case types.FETCH_ASSETS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

function loading(state = false, action) {
  switch (action.type) {
    case types.FETCH_ASSETS_SUCCESS:
    case types.FETCH_ASSETS_FAILURE:
      return false;
    case types.FETCH_ASSETS:
      return true;
    default:
      return state;
  }
}

function error(state = null, action) {
  switch (action.type) {
    case types.FETCH_ASSETS_SUCCESS:
      return null;
    case types.FETCH_ASSETS_FAILURE:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  items,
  loading,
  error
});
