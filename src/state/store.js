import rootReducer from "state/ducks";
import { reduxBatch } from "@manaflair/redux-batch";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import sagas from "./sagas";
import { isDev, keepOnlyNotUndefinedValues } from "utils";
import alerts from "./../fixtures/alerts.json";

const composeEnhancers = composeWithDevTools({
  trace: true
});

const initialStore = {
  alerts: {
    byId: alerts,
    allIds: Object.keys(alerts)
  }
};

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialStore,
    composeEnhancers(
      compose(
        ...keepOnlyNotUndefinedValues([
          reduxBatch,
          applyMiddleware(sagaMiddleware)
        ])
      )
    )
  );

  sagaMiddleware.run(sagas);

  if (isDev) {
    if (module.hot) {
      module.hot.accept("./ducks", () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  return store;
};

export default configureStore;
