import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";

import county from "./county";
import misconduct from "./misconduct";
import judge from "./judge";
import total from "./total";
import crime from "./crime";
import misc from './misc'

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["county", 'judge'], // only persist this slice
};

const rootReducer = combineReducers({
  county,
  misconduct,
  judge,
  total,
  crime,
  misc
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist writes non-serializable values
    }),
  devTools: process.env.NODE_ENV !== "production" && {
    actionSanitizer: (action) => {
      if (action.type.startsWith("legend/") || action.type.includes("Brush")) {
        return { ...action, type: `<<RECHARTS_NOISE: ${action.type}>>` };
      }
      return action;
    },
    stateSanitizer: (state) => {
      if (state && (state.graphicalItems || state.brush || state.legend)) {
        const { graphicalItems, brush, legend, ...actualAppState } = state;
        return actualAppState;
      }
      return state;
    }
  }
});

export const persistor = persistStore(store);
