import { createSelector } from "reselect";

export const getAlerts = state => state.alerts;

export const getAllAlerts = createSelector(
  getAlerts,
  ({ byId, allIds }) => allIds.map(alertId => byId[alertId])
);
