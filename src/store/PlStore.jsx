import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import api from '../utils/Api';
import tableData from '../utils/TableData';
import { PRICELIST_PATH } from '../utils/config';
import { PRICELIST_ERROR_MSG } from '../utils/constants';

const usePricelist = create(devtools((set, get) => ({
  pricelist: [],
  priceTableCols: [],
  priceTableRows: [],
  isLoading: true,
  error: null,
  fetchPriceList: api.fetchData(PRICELIST_PATH)
    .then((res) => {
      set({
        pricelist: res.data,
        priceTableCols: tableData.setColumns(res.data, 3),
        priceTableRows: tableData.setRows(res.data, 3),
        isLoading: false,
        error: null
      })
    })
    .catch((err) => {
      set({ isLoading: false, error: PRICELIST_ERROR_MSG })
    }),
})));

export default usePricelist;
