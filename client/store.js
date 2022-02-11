import { useMemo } from "react";
import { createStore, applyMiddleware, compose } from "redux";
// import thunkMiddleware from "redux-thunk";
// import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "./reducer/index";
import { composeWithDevTools } from "redux-devtools-extension";

let store;

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: [
    "userReducer",
  ],
};

// const composeEnhancers =
//   (!nodeEnv() &&
//     typeof window !== "undefined" &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

function initStore(initialState) {
  let newStore;
  const isClient = typeof window !== "undefined";

  if (isClient) {
    newStore = createStore(
      persistReducer(persistConfig, rootReducer),
      initialState,
    //   composeEnhancers(applyMiddleware(thunkMiddleware))
      composeWithDevTools()
    );

    newStore.__PERSISTOR = persistStore(newStore);
  } else {
    newStore = createStore(
        rootReducer,
      initialState,
    //   composeEnhancers(applyMiddleware(thunkMiddleware))
      composeWithDevTools()
    );
  }
  return newStore;
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  const persistor = persistStore(store);
  return { store, persistor };
}
