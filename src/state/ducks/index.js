import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import assets from "./assets";
import alerts from "./alerts";

export default combineReducers({
  assets,
  alerts,
  form: formReducer
});
