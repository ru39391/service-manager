import axios from 'axios';
import {
  getPricelistLoading,
  getPricelistSucceed,
  getPricelistFailed,
  removeItems,
} from '../slices/pricelist-slice';
import {
  setFormVisible,
  setFormHidden,
  setFormData
} from '../slices/form-slice';

import type { TCustomData, TResponseData, TResponseDefault } from '../../types';
import type { TAppThunk, TAppDispatch } from '../../services/store';

import {
  FETCHING_ERROR_MSG,
  REMOVING_ERROR_MSG,
  REMOVING_SUCCESS_MSG,
  UPDATEDON_KEY,
  NAME_KEY,
  ID_KEY,
  API_URL,
  TYPES
} from '../../utils/constants';

import { deleteDepts } from '../../mocks';

const fetchPricelistData = (): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  dispatch(getPricelistLoading());

  try {
    const response = await Promise.all(Object.values(TYPES).map(alias => axios.get(`${API_URL}${alias}`)));
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

// TODO: переписать thunk по образцу removePricelistData (чтобы принимал alias/массив alias и массив объектов или массив объектов вида { [alias]: массив объектов })
const createPricelistData = (priceListData: TCustomData<TCustomData<string | number>[]>): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  dispatch(getPricelistLoading());

  try {
    const response = await Promise.all(
      Object.values(TYPES).map(alias => axios.post(`${API_URL}${alias}`, {
        ...priceListData[alias].reduce((acc, item, index) => ({...acc, [index]: item}), {})
      }))
    );
    console.log(response);

    const { success, data }: TResponseData = response
      .map(({ data }) => {
        console.log(data);
        return data;
      })
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
      dispatch(getPricelistFailed({ alertMsg: 'ошибка при создании' }));
    }
  } catch(error) {
    dispatch(getPricelistFailed({ alertMsg: 'ошибка при создании' }));
  }
};

const removePricelistData = ({ alias, ids }: { alias: string | null; ids: number[] }): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  dispatch(getPricelistLoading());

  try {
    const {
      success,
      data,
      errors
    }: TResponseDefault = await deleteDepts();
    /*
    axios.delete(`${API_URL}${alias}`, {
      ...ids.reduce((acc, item, index) => ({...acc, [index]: { [ID_KEY]: item }}), {})
    });
    */

    const itemsArr = data ? Object.values(data).filter((value) => typeof value !== 'boolean' && typeof value !== 'string') : [];
    const failedItemsArr = itemsArr.filter((item) => item[UPDATEDON_KEY] === null);

    const handleRespData = () => {
      dispatch(setFormData({}));

      // TODO: отредактировать передачу параметров
      dispatch(setFormVisible({
        title: 'Не всё удалено',
        desc: `Не удалось удалить: ${failedItemsArr.map((item, index, arr) => `"${item[NAME_KEY]}" c id ${item[ID_KEY]}${index === arr.length - 1 ? '.': ', '}`)}`
      }));
    }

    if(success) {
      dispatch(removeItems({
        key: alias as string,
        ids: itemsArr.filter((item) => item[UPDATEDON_KEY] !== null).map((item) => item[ID_KEY]),
        alertMsg: REMOVING_SUCCESS_MSG
      }));
      failedItemsArr.length
        ? handleRespData()
        : dispatch(setFormHidden());
    } else {
      dispatch(getPricelistFailed({ alertMsg: errors ? errors.message as string : REMOVING_ERROR_MSG }));
    }
  } catch(error) {
    const { errors }: { errors: TCustomData<string | boolean | TCustomData<string | number>>; } = error;

    dispatch(getPricelistFailed({ alertMsg: errors ? errors.message as string : REMOVING_ERROR_MSG }));
  }
};

export {
  fetchPricelistData,
  createPricelistData,
  removePricelistData
}
