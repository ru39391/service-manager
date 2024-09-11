import { createSlice } from '@reduxjs/toolkit'

import type {
  TResourceData,
  TCustomData,
  TItemData,
  TItemsArr,
} from '../../types';

import { fetchItemsArr } from '../../utils';
import {
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  ID_KEY,
  NAME_KEY,
  PARENT_KEY
} from '../../utils/constants';

export type TPricelistAction = {
  payload: {
    depts?: TItemsArr;
    subdepts?: TItemsArr;
    groups?: TItemsArr;
    pricelist?: TItemsArr;
    res?: TResourceData[];
    alertType?: string;
    alertMsg?: string;
    type?: string;
    items?: TItemsArr;
  };
};

export type TPricelistState = {
  depts: TItemsArr;
  subdepts: TItemsArr;
  groups: TItemsArr;
  pricelist: TItemsArr;
  res: TResourceData[];
  isPricelistLoading: boolean;
  isPricelistSucceed: boolean;
  isPricelistFailed: boolean;
  alertType: string;
  alertMsg: string;
  response: TCustomData<string | number[]> | null;
};

const initialState: TPricelistState = {
  depts: [],
  subdepts: [],
  groups: [],
  pricelist: [],
  res: [],
  isPricelistLoading: false,
  isPricelistSucceed: false,
  isPricelistFailed: false,
  alertType: 'info',
  alertMsg: '',
  response: null
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
      depts: fetchItemsArr(action.payload.depts),
      subdepts: fetchItemsArr(action.payload.subdepts),
      groups: fetchItemsArr(action.payload.groups),
      pricelist: fetchItemsArr(action.payload.pricelist),
      res: action.payload.res?.map(item => ({
        ...item,
        [NAME_KEY]: item[NAME_KEY].replace(/<[^>]*>/g, ''),
        [PARENT_KEY]: {
          ...item[PARENT_KEY],
          [NAME_KEY]: item[PARENT_KEY][NAME_KEY].replace(/<[^>]*>/g, '')
        },
      })) || [],
      isPricelistLoading: false,
      isPricelistSucceed: true,
      isPricelistFailed: false,
      alertType: '',
      alertMsg: '',
      response: null
    }),
    getPricelistFailed: (state, action: TPricelistAction) => ({
      ...state,
      isPricelistLoading: false,
      isPricelistSucceed: false,
      isPricelistFailed: true,
      alertType: 'error',
      alertMsg: action.payload.alertMsg || '',
      response: null
    }),
    createItems(state, action: TPricelistAction) {
      const { type, items } = {
        type: action.payload.type as string,
        items: action.payload.items as TItemsArr
      };

      return {
        ...state,
        ...(type && Array.isArray(items) && { [type]: [...state[type], ...items] }),
        isPricelistLoading: false,
        isPricelistSucceed: true,
        isPricelistFailed: false,
        alertType: 'success',
        alertMsg: action.payload.alertMsg || '',
        response: {
          action: ADD_ACTION_KEY,
          type,
          ids: items ? items.map((item) => item[ID_KEY] as number) : []
        }
      };
    },
    updateItems(state, action: TPricelistAction) {
      const { type, items } = {
        type: action.payload.type as string,
        items: action.payload.items as TItemsArr
      };
      const ids = items ? items.map((item) => item[ID_KEY] as number) : [];
      const currItems = [...state[type]].filter((item: TItemData) => !ids.includes(item[ID_KEY] as number));

      return {
        ...state,
        ...(type && Array.isArray(items) && { [type]: [...currItems, ...items] }),
        isPricelistLoading: false,
        isPricelistSucceed: true,
        isPricelistFailed: false,
        alertType: 'success',
        alertMsg: action.payload.alertMsg || '',
        response: { action: EDIT_ACTION_KEY, type, ids }
      };
    },
    removeItems(state, action: TPricelistAction) {
      const { type, items } = {
        type: action.payload.type as string,
        items: action.payload.items as TItemsArr
      };
      const ids = items ? items.map((item) => item[ID_KEY] as number) : [];

      return {
        ...state,
        ...(type && { [type]: [...state[type]].filter((item: TItemData) => !ids.includes(item[ID_KEY] as number)) }),
        isPricelistLoading: false,
        isPricelistSucceed: true,
        isPricelistFailed: false,
        alertType: 'success',
        alertMsg: action.payload.alertMsg || '',
        response: { action: REMOVE_ACTION_KEY, type, ids }
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
  createItems,
  updateItems,
  removeItems,
  resetPricelist
} = pricelistSlice.actions;
