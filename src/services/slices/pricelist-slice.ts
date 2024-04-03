import { createSlice } from '@reduxjs/toolkit'

import type { TCustomData } from '../../types';

import { ID_KEY } from '../../utils/constants';

export type TPricelistAction = {
  payload: {
    depts?: TCustomData<string | number | null>[];
    subdepts?: TCustomData<string | number | null>[];
    groups?: TCustomData<string | number | null>[];
    pricelist?: TCustomData<string | number | null>[];
    alertType?: string;
    alertMsg?: string;
    key?: string;
    ids?: number[];
  };
};

export type TPricelistState = {
  depts: TCustomData<string | number | null>[];
  subdepts: TCustomData<string | number | null>[];
  groups: TCustomData<string | number | null>[];
  pricelist: TCustomData<string | number | null>[];
  isPricelistLoading: boolean;
  isPricelistSucceed: boolean;
  isPricelistFailed: boolean;
  alertType: string;
  alertMsg: string;
};

const initialState: TPricelistState = {
  depts: [],
  subdepts: [],
  groups: [],
  pricelist: [],
  isPricelistLoading: false,
  isPricelistSucceed: false,
  isPricelistFailed: false,
  alertType: 'info',
  alertMsg: '',
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
      alertType: '',
      alertMsg: ''
    }),
    getPricelistFailed: (state, action: TPricelistAction) => ({
      ...state,
      isPricelistLoading: false,
      isPricelistSucceed: false,
      isPricelistFailed: true,
      alertType: 'error',
      alertMsg: action.payload.alertMsg || ''
    }),
    // TODO: создать методы:
    /*
    createItems,
    updateItems
    */
    removeItems(state, action: TPricelistAction) {
      const {key, ids} = action.payload;

      return {
        ...state,
        ...([key] && {
          [key as string]: [...state[key as string]].filter((item: TCustomData<string | number>) => ids && !ids.includes(item[ID_KEY] as number))
        }),
        isPricelistLoading: false,
        isPricelistSucceed: true,
        isPricelistFailed: false,
        alertType: 'success',
        alertMsg: action.payload.alertMsg || ''
      };
    },
    resetPricelist: (state) => ({
      ...state,
      isPricelistLoading: false,
      isPricelistSucceed: false,
      isPricelistFailed: false,
      alertType: 'info',
      alertMsg: '',
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
  removeItems,
  resetPricelist
} = pricelistSlice.actions;
