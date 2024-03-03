import { createSlice } from '@reduxjs/toolkit'

import type { TCustomData } from '../../types';

export type TPricelistAction = {
  payload: {
    depts?: TCustomData<string | number>[];
    subdepts?: TCustomData<string | number>[];
    groups?: TCustomData<string | number>[];
    pricelist?: TCustomData<string | number>[];
    errorMsg?: string;
  };
};

export type TPricelistState = {
  depts: TCustomData<string | number>[];
  subdepts: TCustomData<string | number>[];
  groups: TCustomData<string | number>[];
  pricelist: TCustomData<string | number>[];
  isPricelistLoading: boolean;
  isPricelistSucceed: boolean;
  isPricelistFailed: boolean;
  errorMsg: string;
};

const initialState: TPricelistState = {
  depts: [],
  subdepts: [],
  groups: [],
  pricelist: [],
  isPricelistLoading: false,
  isPricelistSucceed: false,
  isPricelistFailed: false,
  errorMsg: '',
};

const pricelistSlice = createSlice({
  name: 'pricelist',
  initialState,
  reducers: {
    getPricelistLoading: (state) => ({
      ...state,
      isPricelistLoading: true
    }),
    getPricelistSucceed: (state, action: TPricelistAction) => ({
      ...state,
      depts: action.payload.depts || [],
      subdepts: action.payload.subdepts || [],
      groups: action.payload.groups || [],
      pricelist: action.payload.pricelist || [],
      isPricelistLoading: false,
      isPricelistSucceed: true,
      isPricelistFailed: false,
      errorMsg: ''
    }),
    getPricelistFailed: (state, action: TPricelistAction) => ({
      ...state,
      isPricelistLoading: false,
      isPricelistSucceed: false,
      isPricelistFailed: true,
      errorMsg: action.payload.errorMsg || ''
    }),
  }
});

export const {
  reducer: pricelistReducer,
  actions: pricelistActions
} = pricelistSlice;
export const {
  getPricelistLoading,
  getPricelistSucceed,
  getPricelistFailed,
} = pricelistSlice.actions;
