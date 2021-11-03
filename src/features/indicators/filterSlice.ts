import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState, AppThunk } from "../../app/store";
import { getDefaultDateRange } from "../functions/date";

export type yn = 0 | 1 | 2;
export interface FilterState {
  periodStart: number;
  periodEnd: number;
  country: number;
  storage: string;
  currency: string;
  isApp: yn;
  loyalty: yn;
  pickup: string;
  payOrder: yn;
  registrationMethod: string;
  periodUserNewStart: number;
  periodUserNewEnd: number;
  isEs: yn;
  isBoutique: yn;
}

const [startDate, endDate] = getDefaultDateRange();

const initialState: FilterState = {
  periodStart: startDate.getTime(),
  periodEnd: endDate.getTime(),
  country: 134,
  storage: "",
  currency: "",
  isApp: 0,
  loyalty: 0,
  pickup: "",
  payOrder: 0,
  registrationMethod: "",
  periodUserNewStart: 0,
  periodUserNewEnd: 0,
  isEs: 0,
  isBoutique: 2,
};

export const indicatorsFilterSlice = createSlice({
  name: "indicatorsFilter",
  initialState,
  reducers: {
    setPeriodStart(state, action: PayloadAction<number>) {
      state.periodStart = action.payload;
    },
    setPeriodEnd(state, action: PayloadAction<number>) {
      state.periodEnd = action.payload;
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
    setPeriodUserNewStart(state, action: PayloadAction<number>) {
      state.periodUserNewStart = action.payload;
    },
    setPeriodUserNewEnd(state, action: PayloadAction<number>) {
      state.periodUserNewEnd = action.payload;
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
  setCountry,
  setStorage,
  setCurrency,
  setIsApp,
  setLoyalty,
  setPickup,
  setPayOrder,
  setRegistrationMethod,
  setPeriodUserNewStart,
  setPeriodUserNewEnd,
  setIsEs,
  setIsBoutique,
  setPeriodStart,
  setPeriodEnd,
} = indicatorsFilterSlice.actions;

export const selectPeriodStart = (state: AppState) =>
  state.indicatorsFilter.periodStart;

export const selectPeriodEnd = (state: AppState) =>
  state.indicatorsFilter.periodEnd;

export const selectCountry = (state: AppState) =>
  state.indicatorsFilter.country;

export const selectCurrency = (state: AppState) =>
  state.indicatorsFilter.currency;

export const selectStorage = (state: AppState) =>
  state.indicatorsFilter.storage;

export const selectIsApp = (state: AppState) => state.indicatorsFilter.isApp;

export const selectIsLoyalty = (state: AppState) =>
  state.indicatorsFilter.loyalty;

export const selectPickup = (state: AppState) => state.indicatorsFilter.pickup;

export const selectPayOrder = (state: AppState) =>
  state.indicatorsFilter.payOrder;

export const selectRegistrationMethod = (state: AppState) =>
  state.indicatorsFilter.registrationMethod;

export const selectPeriodNewStart = (state: AppState) =>
  state.indicatorsFilter.periodUserNewStart;

export const selectPeriodNewEnd = (state: AppState) =>
  state.indicatorsFilter.periodUserNewEnd;

export const selectIsEs = (state: AppState) => state.indicatorsFilter.isEs;

export const selectIsBoutique = (state: AppState) =>
  state.indicatorsFilter.isBoutique;

export const selectFilterIndicator = (state: AppState) =>
  state.indicatorsFilter;

export default indicatorsFilterSlice.reducer;
