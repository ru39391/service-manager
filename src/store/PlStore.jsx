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
    .then(({ data }) => {
      set({
        pricelist: data,
        priceTableCols: tableData.setColumns(data, 3),
        isLoading: false,
        error: null,
      })
    })
    .catch((err) => {
      set({ isLoading: false, error: PRICELIST_ERROR_MSG })
    }),
  handlePlRows: (arr) => {
    const findItem = (array, value) => { return array.find(({ id }) => id === value) };
    const deptsArr = arr.map(({ id, name, subdepts }) => ({ id, name, subdepts }));

    const rowsArr = get().pricelist.map(({ id, name, price, dept, subdept, group }) => {
      const { name: deptName, subdepts } = findItem(deptsArr, dept);
      const { name: subDeptName } = findItem(Object.values(subdepts), subdept);
      return {
        id,
        name,
        price,
        dept: deptName,
        subdept: subDeptName,
        group,
      };
    });

    set({ priceTableRows: tableData.setRows(rowsArr) });
  },
  getPlRowData: ({ id }) => {
    console.log(get().pricelist[id - 1]);
  }
})));

export default usePricelist;
