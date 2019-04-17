import {
  FETCH_ASSETS,
  FETCH_ASSETS_SUCCESS,
  FETCH_ASSETS_FAILURE
} from "./types";

export const fetchAssets = () => ({ type: FETCH_ASSETS });

export const fetchAssetsSuccess = assets => ({
  type: FETCH_ASSETS_SUCCESS,
  payload: assets
});
export const fetchAssetsFailure = error => ({
  type: FETCH_ASSETS_FAILURE,
  payload: error
});
