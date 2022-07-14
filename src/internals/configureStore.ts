import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootSaga, { mainReducers } from "./rootState";
import createSagaMiddleware from "redux-saga";

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with saga middleware and router middleware
  const middlewares = [sagaMiddleware];

  const store = configureStore({
    reducer: combineReducers({ ...mainReducers }),
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      ...middlewares,
    ],
    devTools: process.env.NODE_ENV !== "production",
  });

  // Add all combined Sagas to middleware
  sagaMiddleware.run(rootSaga);

  return store;
}
