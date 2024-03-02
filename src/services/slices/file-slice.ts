import { createSlice } from '@reduxjs/toolkit'

import type { TCustomData } from '../../types';

export type TFileAction = {
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

export type TFileState = {
  depts: TCustomData<string | number>[];
  subdepts: TCustomData<string | number>[];
  groups: TCustomData<string | number>[];
  items: TCustomData<string | number>[];
  rowData: TCustomData<string | number> | null;
  isFileUploading: boolean;
  isFileUploadingFailed: boolean;
  errorMsg: string;
};

const initialState: TFileState = {
  depts: [],
  subdepts: [],
  groups: [],
  items: [],
  rowData: null,
  isFileUploading: false,
  isFileUploadingFailed: false,
  errorMsg: '',
};

const fileSlice = createSlice({
  name: 'order',
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
      items: action.payload.items || [],
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
