import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import counterReducer from "../features/counter/counterSlice";
import indicatorsFilterReducer from "../features/indicators/filterSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      indicatorsFilter: indicatorsFilterReducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
