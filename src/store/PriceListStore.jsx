import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import api from '../utils/Api';
import { PRICELIST_PATH } from '../utils/config';
import { PRICELIST_ERROR_MSG } from '../utils/constants';

const usePriceList = create(devtools((set, get) => ({
  pricelist: [],
  isLoading: true,
  error: null,
  fetchPriceList: api.fetchData(PRICELIST_PATH)
    .then(({ data }) => {
      set({
        pricelist: data,
        isLoading: false,
        error: null,
      })
    })
    .catch((err) => set({
      isLoading: false,
      error: PRICELIST_ERROR_MSG
    })),
})));

export default usePriceList;
