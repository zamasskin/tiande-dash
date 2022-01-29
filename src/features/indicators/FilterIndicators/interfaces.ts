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
  periodUserRegisterStart: number;
  periodUserRegisterEnd: number;
}
