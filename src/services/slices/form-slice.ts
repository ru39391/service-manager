import { createSlice } from '@reduxjs/toolkit'

import type { TCustomData, TItemData, TItemsArr } from '../../types';

type TFormData = {
  action: string;
  type: string;
  data: TItemData;
  values?: TItemData;
  items?: TItemsArr;
  isFormHidden?: boolean;
};

export type TFormAction = {
  payload: {
    title?: string;
    desc?: string;
    data?: TFormData | null;
    values?: TItemData | null;
  };
};

export type TFormState = {
  isVisible: boolean;
  formTitle: string;
  formDesc: string;
  formData: TFormData | null;
  formValues: TItemData;
};

const initialState: TFormState = {
  isVisible: false,
  formTitle: '',
  formDesc: '',
  formData: null,
  formValues: {}
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormVisible: (state, action: TFormAction) => ({
      ...state,
      isVisible: true,
      formTitle: action.payload.title || '',
      formDesc: action.payload.desc || '',
    }),
    setFormHidden: (state) => ({
      ...state,
      isVisible: false,
      formTitle: '',
      formDesc: '',
      formData: null,
      formValues: {}
    }),
    setFormData: (state, action: TFormAction) => ({
      ...state,
      formData: action.payload.data || null
    }),
    setFormValues: (state, action: TFormAction) => ({
      ...state,
      formValues: action.payload.values || {}
    }),
  }
});

export const {
  reducer: formReducer,
  actions: formActions
} = formSlice;
export const {
  setFormVisible,
  setFormHidden,
  setFormData,
  setFormValues
} = formSlice.actions;
