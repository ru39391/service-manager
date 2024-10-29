import axios from 'axios';
import { AxiosResponse } from 'axios';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
  getPricelistLoading,
  getPricelistSucceed,
  getPricelistFailed,
  createItems,
  updateItems,
  removeItems,
} from '../slices/pricelist-slice';
import {
  setFormVisible,
  setFormHidden,
  setFormData
} from '../slices/form-slice';

import type {
  TCustomData,
  TItemData,
  TItemsArr,
  TResponseData,
  TResponseItems,
  TResponseDefault
} from '../../types';
import type { TAppThunk, TAppDispatch } from '../../services/store';
import type { TPricelistAction } from '../slices/pricelist-slice';

import {
  RES_KEY,
  RESLINKS_KEY,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  FETCHING_ERROR_MSG,
  CREATE_ITEM_SUCCESS_MSG,
  CREATE_ITEM_WARNING_MSG,
  CREATE_ITEM_ERROR_MSG,
  UPDATE_ITEM_SUCCESS_MSG,
  UPDATE_ITEM_WARNING_MSG,
  UPDATE_ITEM_ERROR_MSG,
  REMOVE_ITEM_SUCCESS_MSG,
  REMOVE_ITEM_WARNING_MSG,
  REMOVE_ITEM_ERROR_MSG,
  API_URL,
  TYPES
} from '../../utils/constants';
import { handleRespData, setRespMessage } from '../../utils';

import { fetchData } from '../../mocks';

const fetchPricelistData = (): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  dispatch(getPricelistLoading());

  const keys = [...Object.values(TYPES), RES_KEY, RESLINKS_KEY];

  try {
    const response = await Promise.all(keys.map(type => axios.get(`${API_URL}${type}`)));
    //console.log(response);

    const { success, data }: TResponseData = response
      .map(({ data }) => data)
      .reduce((acc: TResponseData, item: TResponseDefault, index ) => ({
        ...acc,
        success: [...acc.success, item.success],
        data: {
          ...acc.data,
          [keys[index]]: item.data && Object.values(item.data).filter((value) => typeof value !== 'boolean')
        }
      }), {
        success: [],
        data: {}
      });

    if(success.every(item => item)) {
      dispatch(getPricelistSucceed({ ...data }));
    } else {
      dispatch(getPricelistFailed({ alertMsg: FETCHING_ERROR_MSG }));
    }
  } catch(error) {
    dispatch(getPricelistFailed({ alertMsg: FETCHING_ERROR_MSG }));
  }
};

const handlePricelistData = ({ action, type, items }: { action: string; type: string | null; items: TItemsArr; }): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  const actionData = {
    [ADD_ACTION_KEY]: {
      handler: async (url: string, data: TCustomData<TItemData>) => await axios.post(url, data),
      dispatcher: (data: TPricelistAction['payload']) => createItems(data),
      modalTitle: CREATE_ITEM_WARNING_MSG,
      successMsg: CREATE_ITEM_SUCCESS_MSG,
      errorMsg: CREATE_ITEM_ERROR_MSG,
    },
    [EDIT_ACTION_KEY]: {
      handler: async (url: string, data: TCustomData<TItemData>) => await axios.patch(url, data),
      dispatcher: (data: TPricelistAction['payload']) => updateItems(data),
      modalTitle: UPDATE_ITEM_WARNING_MSG,
      successMsg: UPDATE_ITEM_SUCCESS_MSG,
      errorMsg: UPDATE_ITEM_ERROR_MSG,
    },
    [REMOVE_ACTION_KEY]: {
      handler: async (url: string, data: TCustomData<TItemData>) => await axios.delete(url, data),
      dispatcher: (data: TPricelistAction['payload']) => removeItems(data),
      modalTitle: REMOVE_ITEM_WARNING_MSG,
      successMsg: REMOVE_ITEM_SUCCESS_MSG,
      errorMsg: REMOVE_ITEM_ERROR_MSG,
    },
  };
  const {
    handler,
    dispatcher,
    modalTitle,
    successMsg,
    errorMsg
  }: {
    handler: (url: string, data: TCustomData<TItemData>) => Promise<AxiosResponse<string, TCustomData<TItemData>>>;
    dispatcher: ActionCreatorWithPayload<TPricelistAction['payload'], string>;
    modalTitle: string;
    successMsg: string;
    errorMsg: string;
  } = actionData[action];

  //console.log(actionData[action]);
  //return;

  if(!type) {
    dispatch(getPricelistFailed({ alertMsg: 'Не удалось определить тип переданного элемента' }));
    return;
  }

  dispatch(getPricelistLoading());

  console.log({
    action,
    url: `${API_URL}${type}`,
    payload: { ...items.reduce((acc, item, index) => ({...acc, [index]: item }), {}) }
  });

  try {
    const {
      success,
      data,
      errors
    }: TResponseDefault = await fetchData(items);
    /*
    await handler(`${API_URL}${type}`, {
      ...items.reduce((acc, item, index) => ({...acc, [index]: item }), {})
    });
    await axios.delete(`${API_URL}${type}`, {
      ...items.reduce((acc, item, index) => ({...acc, [index]: item }), {})
    });
    */

    const {
      message,
      counter,
      succeed,
      failed,
      inValid
    } = success ? data as TResponseItems : errors as TResponseItems;
    const {
      succeed: succeedValue,
      failed: failedValue,
      inValid: inValidValue
    } = counter;
    const itemsArr = handleRespData(succeed);
    const failedItemsArr = handleRespData(failed);
    const inValidItemsArr = handleRespData(inValid);

    const handleFailedData = () => {
      dispatch(setFormData({}));

      dispatch(setFormVisible({
        title: message || modalTitle,
        desc: setRespMessage({failedValue, inValidValue, failedItemsArr, inValidItemsArr})
      }));
    }

    if(success) {
      dispatch(dispatcher({
        type,
        items: itemsArr, // .filter((item) => item[UPDATEDON_KEY] !== null)
        alertMsg: `${successMsg}, обработано элементов: ${succeedValue}`
      }));
      failedValue || inValidValue
        ? handleFailedData()
        : dispatch(setFormHidden());
    } else {
      dispatch(getPricelistFailed({ alertMsg: errors ? message as string : errorMsg }));
    }
  } catch(error) {
    const { errors }: { errors: TResponseDefault['errors']; } = error;

    dispatch(getPricelistFailed({ alertMsg: errors ? errors.message as string : errorMsg }));
  }
};

export {
  fetchPricelistData,
  handlePricelistData
}
