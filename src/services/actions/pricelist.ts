import axios from 'axios';
import {
  getPricelistLoading,
  getPricelistSucceed,
  getPricelistFailed,
} from '../slices/pricelist-slice';

import type { TCustomData, TResponseData, TResponseDefault } from '../../types';
import type { TAppThunk, TAppDispatch } from '../../services/store';

import { PRICELIST_ERROR_MSG, API_URL, TYPES } from '../../utils/constants';

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
          [Object.values(TYPES)[index]]: item.data
        }
      }), {
        success: [],
        data: {}
      });

    if(success.every(item => item)) {
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
      [Object.values(TYPES)[0]]
        .map(alias => axios.post(`${API_URL}${alias}`, {...priceListData[alias].reduce((acc, item, index) => ({...acc, [index]: item}), {})}))
    );
    console.log(response);

    const { success, data }: TResponseData = response
      .map(({ data }) => data)
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

export {
  fetchPricelistData,
  createPricelistData
}
