import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState, AppThunk } from "../../app/store";
import { getDefaultDateRange } from "../functions/date";

export type yn = 0 | 1 | 2;
export interface DynamicsFilterState {
  periodStart: number;
  periodEnd: number;
  country: number;
  currency: string;
  isApp: yn;
  loyalty: yn;
  pickup: string;
  payOrder: yn;
  registrationMethod: string;
  periodUserNewStart: number;
  periodUserNewEnd: number;
  isEs: yn;
  periodType: string;
}

const [startDate, endDate] = getDefaultDateRange();

const initialState: DynamicsFilterState = {
  periodStart: startDate.getTime(),
  periodEnd: endDate.getTime(),
  country: 0,
  currency: "",
  isApp: 0,
  loyalty: 0,
  pickup: "",
  payOrder: 0,
  registrationMethod: "",
  periodUserNewStart: 0,
  periodUserNewEnd: 0,
  isEs: 0,
  periodType: "%Y-%m-%d",
};

export const dynamicsFilterSlice = createSlice({
  name: "dynamicsFilter",
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
    setPeriodType(state, action: PayloadAction<string>) {
      state.periodType = action.payload;
    },
  },
});

export const {
  setCountry,
  setCurrency,
  setIsApp,
  setLoyalty,
  setPickup,
  setPayOrder,
  setRegistrationMethod,
  setPeriodUserNewStart,
  setPeriodUserNewEnd,
  setIsEs,
  setPeriodStart,
  setPeriodEnd,
  setPeriodType,
} = dynamicsFilterSlice.actions;

export const selectPeriodStart = (state: AppState) =>
  state.dynamicsFilter.periodStart;

export const selectPeriodEnd = (state: AppState) =>
  state.dynamicsFilter.periodEnd;

export const selectCountry = (state: AppState) => state.dynamicsFilter.country;

export const selectCurrency = (state: AppState) =>
  state.dynamicsFilter.currency;

export const selectIsApp = (state: AppState) => state.dynamicsFilter.isApp;

export const selectIsLoyalty = (state: AppState) =>
  state.dynamicsFilter.loyalty;

export const selectPickup = (state: AppState) => state.dynamicsFilter.pickup;

export const selectPayOrder = (state: AppState) =>
  state.dynamicsFilter.payOrder;

export const selectRegistrationMethod = (state: AppState) =>
  state.dynamicsFilter.registrationMethod;

export const selectPeriodNewStart = (state: AppState) =>
  state.dynamicsFilter.periodUserNewStart;

export const selectPeriodNewEnd = (state: AppState) =>
  state.dynamicsFilter.periodUserNewEnd;

export const selectIsEs = (state: AppState) => state.dynamicsFilter.isEs;
export const selectPeriodType = (state: AppState) =>
  state.dynamicsFilter.periodType;

export const selectFilterIndicator = (state: AppState) => state.dynamicsFilter;

export default dynamicsFilterSlice.reducer;
