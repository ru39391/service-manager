import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import api from '../utils/Api';
import tableData from '../utils/TableData';
import { RESOURCES_PATH } from '../utils/config';
import { RESOURCES_ERROR_MSG } from '../utils/constants';

const useResList = create(devtools((set, get) => ({
  resources: [],
  resTableCols: [],
  resTableRows: [],
  resTableRowData: {},
  isLoading: true,
  error: null,
  fetchRes: api.fetchData(RESOURCES_PATH)
    .then(({ data }) => {
      set({
        resources: data,
        resTableCols: tableData.setColumns(data),
        isLoading: false,
        error: null,
      });
    })
    .catch((err) => set({
      isLoading: false,
      error: RESOURCES_ERROR_MSG,
    })),
  setRlRows: (arr) => set({ resTableRows: tableData.setRows(arr) }),
  handleRlRows: (arr) => get().setRlRows(arr),
  setCurrentRows: (data, arr) => {
    const { id, type } = data;
    get().handleRlRows(arr, get().resTableRows.filter(item => item[type] === id));
  },
  getRlRowData: (row = {}) => {
    const resTableRowData = Object.values(row).length ? get().resTableRows.find(({ name }) => name.toLowerCase() === row.col1.toLowerCase()) : {};
    set({ resTableRowData });
  }
})));

export default useResList;
