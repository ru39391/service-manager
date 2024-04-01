import axios from 'axios';
import {
  getPricelistLoading,
  getPricelistSucceed,
  getPricelistFailed,
} from '../slices/pricelist-slice';

import type { TCustomData, TResponseData, TResponseDefault } from '../../types';
import type { TAppThunk, TAppDispatch } from '../../services/store';

import {
  FETCHING_ERROR_MSG,
  REMOVING_ERROR_MSG,
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
      dispatch(getPricelistFailed({ errorMsg: FETCHING_ERROR_MSG }));
    }
  } catch(error) {
    dispatch(getPricelistFailed({ errorMsg: FETCHING_ERROR_MSG }));
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
      dispatch(getPricelistFailed({ errorMsg: 'ошибка при создании' }));
    }
  } catch(error) {
    dispatch(getPricelistFailed({ errorMsg: 'ошибка при создании' }));
  }
};

const removePricelistData = ({ alias, ids }: { alias: string | null; ids: number[] }): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  dispatch(getPricelistLoading());

  console.log(`${API_URL}${alias}`);
  console.log(ids);
  console.log({
    ...ids.reduce((acc, item, index) => ({...acc, [index]: { [ID_KEY]: item }}), {})
  });

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

    console.log('success: ', success);
    console.log('data: ', data);
    console.log('errors: ', errors);

    const itemsArr = data ? Object.values(data).filter((value) => typeof value !== 'boolean' && typeof value !== 'string') : [];
    const failedItemsArr = itemsArr.filter((item) => item[UPDATEDON_KEY] === null);

    if(success) {
      failedItemsArr.length
        // TODO: здесь закрывать текущее модальное окно и открывать новое с перечнем проблемных ресурсов
        ? dispatch(getPricelistFailed({ errorMsg: REMOVING_ERROR_MSG }))
        // TODO: здесь вызывать метод для обновления элементов в хранилище, показывать уведомление об успешном завершении операции
        : console.log(itemsArr.filter((item) => item[UPDATEDON_KEY] !== null));

      console.log('failedItemsArr: ', failedItemsArr.map((item) => item[NAME_KEY]));
    } else {
      dispatch(getPricelistFailed({ errorMsg: errors ? errors.message as string : REMOVING_ERROR_MSG }));
    }
  } catch(error) {
    const { errors }: { errors: TCustomData<string | boolean | TCustomData<string | number>>; } = error;

    dispatch(getPricelistFailed({ errorMsg: errors ? errors.message as string : REMOVING_ERROR_MSG }));
  }
};

export {
  fetchPricelistData,
  createPricelistData,
  removePricelistData
}
