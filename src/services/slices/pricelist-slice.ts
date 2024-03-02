import { createSlice } from '@reduxjs/toolkit'

import type { TCustomData } from '../../types';

export type TPricelistAction = {
  payload: {
    depts?: TCustomData<string | number>[];
    subdepts?: TCustomData<string | number>[];
    groups?: TCustomData<string | number>[];
    items?: TCustomData<string | number>[];
    data?: TCustomData<string | number> | null;
    item?: TCustomData<string | number>;
    key?: string;
    errorMsg?: string;
  };
};

export type TPricelistState = {
  depts: TCustomData<string | number>[];
  subdepts: TCustomData<string | number>[];
  groups: TCustomData<string | number>[];
  items: TCustomData<string | number>[];
  rowData: TCustomData<string | number> | null;
  isPricelistLoading: boolean;
  isPricelistFailed: boolean;
  errorMsg: string;
};

const initialState: TPricelistState = {
  depts: [],
  subdepts: [],
  groups: [],
  items: [],
  rowData: null,
  isPricelistLoading: false,
  isPricelistFailed: false,
  errorMsg: '',
};

const pricelistSlice = createSlice({
  name: 'pricelist',
  initialState,
  reducers: {
  }
});

export const {
  reducer: pricelistReducer,
  actions: pricelistActions
} = pricelistSlice;
export const {
} = pricelistSlice.actions;
