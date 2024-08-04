import { createSlice } from '@reduxjs/toolkit'

import type { TCustomData } from '../../types';

export type TFileAction = {
  payload: {
    depts?: TCustomData<string | number>[];
    subdepts?: TCustomData<string | number>[];
    groups?: TCustomData<string | number>[];
    pricelist?: TCustomData<string | number>[];
    data?: TCustomData<string | number> | null;
    item?: TCustomData<string | number>;
    key?: string;
    errorMsg?: string;
  };
};

export type TFileState = {
  depts: TCustomData<string | number>[];
  subdepts: TCustomData<string | number>[];
  groups: TCustomData<string | number>[];
  pricelist: TCustomData<string | number>[];
  rowData: TCustomData<string | number> | null;
  isFileUploading: boolean;
  isFileUploadingFailed: boolean;
  errorMsg: string;
};

const initialState: TFileState = {
  depts: [],
  subdepts: [],
  groups: [],
  pricelist: [],
  rowData: null,
  isFileUploading: false,
  isFileUploadingFailed: false,
  errorMsg: '',
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    getFileUploading: (state) => ({
      ...state,
      isFileUploading: true
    }),
    getFileUploadingSucceed: (state, action: TFileAction) => ({
      ...state,
      depts: action.payload.depts || [],
      subdepts: action.payload.subdepts || [],
      groups: action.payload.groups || [],
      pricelist: action.payload.pricelist || [],
      isFileUploading: false,
      isFileUploadingFailed: false,
      errorMsg: ''
    }),
    getFileUploadingFailed: (state, action: TFileAction) => ({
      ...state,
      isFileUploading: false,
      isFileUploadingFailed: true,
      errorMsg: action.payload.errorMsg || ''
    }),
    setRowData: (state, action: TFileAction) => ({
      ...state,
      rowData: action.payload.data || null
    }),
    updateItems: (state, action: TFileAction) => ({
      ...state,
      //@ts-expect-error
      ...(action.payload.key && {[action.payload.key]: [...state[action.payload.key], action.payload.item]})
    }),
  }
});

export const {
  reducer: fileReducer,
  actions: fileActions
} = fileSlice;
export const {
  getFileUploading,
  getFileUploadingSucceed,
  getFileUploadingFailed,
  setRowData,
  updateItems
} = fileSlice.actions;
