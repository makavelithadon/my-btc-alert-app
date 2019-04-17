import { createSelector } from "reselect";

export const getAssets = state => state.assets;

export const getItems = createSelector(
  getAssets,
  assets => assets.items
);

export const isLoading = createSelector(
  getAssets,
  assets => assets.loading
);

export const error = createSelector(
  getAssets,
  assets => assets.error
);
