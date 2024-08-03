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
  TPricelistData,
  TResponseData,
  TResponseList,
  TResponseItems,
  TResponseDefault
} from '../../types';
import type { TAppThunk, TAppDispatch } from '../../services/store';
import type { TPricelistAction } from '../slices/pricelist-slice';

import {
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  FETCHING_ERROR_MSG,
  REMOVING_ERROR_MSG,
  REMOVING_SUCCESS_MSG,
  UPDATEDON_KEY,
  NAME_KEY,
  ID_KEY,
  API_URL,
  TYPES
} from '../../utils/constants';
import { handleRespData, setRespMessage } from '../../utils';

import { deleteDepts, fetchData } from '../../mocks';

const fetchPricelistData = (): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  dispatch(getPricelistLoading());

  try {
    const response = await Promise.all(Object.values(TYPES).map(alias => axios.get(`${API_URL}${alias}`)));
    console.log(response);

    const { success, data }: TResponseData = response
      .map(({ data }) => data)
      .reduce((acc: TResponseData, item: TResponseDefault, index ) => ({
        ...acc,
        success: [...acc.success, item.success],
        data: {
          ...acc.data,
          [Object.values(TYPES)[index]]: item.data && Object.values(item.data).filter((value) => typeof value !== 'boolean')
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

// TODO: обновить действия thunk-контроллеров для случая успешного ответа
const handlePricelistData = ({ action, alias, items }: { action: string; alias: string | null; items: TItemsArr; }): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  const actionData = {
    [ADD_ACTION_KEY]: {
      handler: async (url: string, data: TCustomData<TItemData>) => await axios.post(url, data),
      dispatcher: (data: TPricelistAction['payload']) => createItems(data),
      modalTitle: 'Не всё создано',
      successMsg: 'успешно создано',
      errorMsg: 'ошибка при создании',
    },
    [EDIT_ACTION_KEY]: {
      handler: async (url: string, data: TCustomData<TItemData>) => await axios.patch(url, data),
      dispatcher: (data: TPricelistAction['payload']) => updateItems(data),
      modalTitle: 'Не всё обновлено',
      successMsg: 'успешно обновлено',
      errorMsg: 'ошибка при обновлении',
    },
    [REMOVE_ACTION_KEY]: {
      handler: async (url: string, data: TCustomData<TItemData>) => await axios.delete(url, data),
      dispatcher: (data: TPricelistAction['payload']) => removeItems(data),
      modalTitle: 'Не всё удалено',
      successMsg: REMOVING_SUCCESS_MSG,
      errorMsg: REMOVING_ERROR_MSG,
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

  console.log(actionData[action]);
  //return;

  if(!alias) {
    dispatch(getPricelistFailed({ alertMsg: errorMsg }));
    return;
  }

  dispatch(getPricelistLoading());

  console.log({
    action,
    url: `${API_URL}${alias}`,
    payload: { ...items.reduce((acc, item, index) => ({...acc, [index]: item }), {}) }
  });

  try {
    const {
      success,
      data,
      errors
    }: TResponseDefault = await deleteDepts();
    /*
    await handler(`${API_URL}${alias}`, {
      ...items.reduce((acc, item, index) => ({...acc, [index]: item }), {})
    });
    await axios.delete(`${API_URL}${alias}`, {
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

      // TODO: отредактировать передачу параметров ???
      dispatch(setFormVisible({
        title: message || modalTitle,
        desc: setRespMessage({failedValue, inValidValue, failedItemsArr, inValidItemsArr})
      }));
    }

    if(success) {
      dispatch(dispatcher({
        key: alias as string,
        // TODO: вынести mapping в метод
        ids: itemsArr.filter((item) => item[UPDATEDON_KEY] !== null).map((item) => item[ID_KEY] as number),
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
