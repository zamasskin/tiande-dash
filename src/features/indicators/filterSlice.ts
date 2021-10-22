import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState, AppThunk } from "../../app/store";
import { getDefaultDateRange } from "../functions/date";

export type yn = 0 | 1 | 2;
export interface FilterState {
  period: moment.Moment[];
  country: number;
  storage: string;
  currency: string;
  isApp: yn;
  loyalty: yn;
  pickup: string;
  payOrder: yn;
  registrationMethod: string;
  periodUserNew: moment.Moment[];
  isEs: yn;
  isBoutique: yn;
}

const initialState: FilterState = {
  period: getDefaultDateRange(),
  country: 0,
  storage: "",
  currency: "",
  isApp: 0,
  loyalty: 0,
  pickup: "",
  payOrder: 0,
  registrationMethod: "",
  periodUserNew: [],
  isEs: 0,
  isBoutique: 0,
};

export const indicatorsFilterSlice = createSlice({
  name: "indicatorsFilter",
  initialState,
  reducers: {
    setPeriod(state, action: PayloadAction<moment.Moment[]>) {
      state.period = action.payload;
    },
    setCountry(state, action: PayloadAction<number>) {
      state.country = action.payload;
    },
    setStorage(state, action: PayloadAction<string>) {
      state.storage = action.payload;
    },
    setCurrency(state, action: PayloadAction<string>) {
      state.currency = action.payload;
    },
    setIsApp(state, action: PayloadAction<yn>) {
      state.isApp = action.payload;
    },
    setLoyalty(state, action: PayloadAction<yn>) {
      state.loyalty = action.payload;
    },
    setPickup(state, action: PayloadAction<string>) {
      state.pickup = action.payload;
    },
    setPayOrder(state, action: PayloadAction<yn>) {
      state.payOrder = action.payload;
    },
    setRegistrationMethod(state, action: PayloadAction<string>) {
      state.registrationMethod = action.payload;
    },
    setPeriodUserNew(state, action: PayloadAction<moment.Moment[]>) {
      state.periodUserNew = action.payload;
    },
    setIsEs(state, action: PayloadAction<yn>) {
      state.isEs = action.payload;
    },
    setIsBoutique(state, action: PayloadAction<yn>) {
      state.isBoutique = action.payload;
    },
  },
});

export const {
  setPeriod,
  setCountry,
  setStorage,
  setCurrency,
  setIsApp,
  setLoyalty,
  setPickup,
  setPayOrder,
  setRegistrationMethod,
  setPeriodUserNew,
  setIsEs,
  setIsBoutique,
} = indicatorsFilterSlice.actions;

export const selectPeriodStart = (state: AppState) =>
  state.indicatorsFilter.period[0];

export const selectPeriodEnd = (state: AppState) =>
  state.indicatorsFilter.period[1];

export default indicatorsFilterSlice.reducer;
