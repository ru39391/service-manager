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
  priceTableRowData: {},
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
    .catch((err) => set({ isLoading: false, error: PRICELIST_ERROR_MSG })),
  setPlRows: (arr) => set({ priceTableRows: tableData.setRows(arr) }),
  handlePlRows: (arr, pricelist = get().pricelist) => {
    const findItem = (array, value) => { return array.find(({ id }) => id === value) };
    const deptsArr = arr.map(({ id, name, subdepts, groups }) => ({ id, name, subdepts, groups }));
    const rowsArr = pricelist.map(({ id, name, price, dept, subdept, group }, index) => {
      const {
        name: deptName,
        subdepts,
        groups
      } = findItem(deptsArr, dept);
      const { name: subDeptName } = findItem(Object.values(subdepts), subdept);
      const { name: groupName } = findItem(Object.values(groups), group);
      return {
        id: index + 1,
        name,
        price,
        dept: deptName,
        subdept: subDeptName,
        group: groupName,
      };
    });
    get().setPlRows(rowsArr);
  },
  setCurrentRows: (data, arr) => {
    const { id, type } = data;
    get().handlePlRows(arr, get().pricelist.filter(item => item[type] === id));
  },
  getPlRowData: (row = {}) => {
    const priceTableRowData = Object.values(row).length ? get().pricelist.find(({ name }) => name.toLowerCase() === row.col1.toLowerCase()) : {};
    set({ priceTableRowData });
  }
})));

export default usePricelist;
