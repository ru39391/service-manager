import axios from 'axios';
import {
  getPricelistLoading,
  getPricelistSucceed,
  getPricelistFailed,
} from '../slices/pricelist-slice';

import {
  getDepts,
  getSubdepts,
  getGroups,
  getPricelist,
  postDepts
} from '../../mocks';

import type { TCustomData, TResponseData, TResponseDefault } from '../../types';
import type { TAppThunk, TAppDispatch } from '../../services/store';

import { PRICELIST_ERROR_MSG, ID_KEY, API_URL, TYPES } from '../../utils/constants';

const fetchPricelistData = (): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  dispatch(getPricelistLoading());

  try {
    // Object.values(TYPES).map(alias => axios.get(`${API_URL}${alias}`))
    const response = await Promise.all([getDepts(), getSubdepts(), getGroups(), getPricelist()]);
    const { success, data }: TResponseData = response
      //.map(({ data }) => data)
      .reduce((acc: TResponseData, item: TResponseDefault, index ) => ({
        ...acc,
        success: [...acc.success, item.success],
        data: {
          ...acc.data,
          [Object.values(TYPES)[index]]: Object.values(item.data).filter((value) => typeof value !== 'boolean')
        }
      }), {
        success: [],
        data: {}
      });

    if(success.every(item => item)) {
      // console.log(Object.values(data.depts).filter((item) => typeof item !== 'boolean'));
      dispatch(getPricelistSucceed({ ...data }));
    } else {
      dispatch(getPricelistFailed({ errorMsg: PRICELIST_ERROR_MSG }));
    }
  } catch(error) {
    dispatch(getPricelistFailed({ errorMsg: PRICELIST_ERROR_MSG }));
  }
};

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
          [Object.values(TYPES)[index]]: item.data
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

const removePricelistData = (priceListData: TCustomData<TCustomData<string | number>[]>, { type, id }: TCustomData<string | number>): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  dispatch(getPricelistLoading());

  console.log(`${API_URL}${type}`);
  console.log(priceListData[type].find((item) => item[ID_KEY] === id));
  console.log({ [ID_KEY]: id });

  /*
  try {

  } catch(error) {
    dispatch(getPricelistFailed({ errorMsg: 'ошибка при удалении' }));
  }
  */
};

export {
  fetchPricelistData,
  createPricelistData,
  removePricelistData
}
