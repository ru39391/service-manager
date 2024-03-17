import { createSlice } from '@reduxjs/toolkit'

import type { TCustomData } from '../../types';

export type TModalAction = {
  payload: {
    title?: string;
    desc?: string;
    data?: TCustomData<string | number | TCustomData<string | number>> | null;
  };
};

export type TModalState = {
  isOpen: boolean;
  modalTitle: string;
  modalDesc: string;
  formData: TCustomData<string | number> | null;
};

const initialState: TModalState = {
  isOpen: false,
  modalTitle: '',
  modalDesc: '',
  formData: null
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalOpen: (state, action: TModalAction) => ({
      ...state,
      isOpen: true,
      modalTitle: action.payload.title || '',
      modalDesc: action.payload.desc || '',
    }),
    setModalClose: (state) => ({
      ...state,
      isOpen: false,
      modalTitle: '',
      modalDesc: '',
      formData: null
    }),
    setFormData: (state, action: TModalAction) => ({
      ...state,
      formData: action.payload.data || null
    }),
  }
});

export const {
  reducer: modalReducer,
  actions: modalActions
} = modalSlice;
export const {
  setModalOpen,
  setModalClose,
  setFormData
} = modalSlice.actions;
