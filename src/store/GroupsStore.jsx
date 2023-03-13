import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import tableData from '../utils/TableData';

const useGroupsList = create(devtools((set, get) => ({
  groupsTableCols: [],
  groupsTableRows: [],
  groupsTableRowData: {},
  setGlRows: (arr) => set({ groupsTableRows: tableData.setRows(arr) }),
  handleGlRows: (arr) => get().setGlRows(arr),
  setCurrentRows: (data, arr) => {
    const { id, type } = data;
    get().handleGlRows(arr, get().groupsTableRows.filter(item => item[type] === id));
  },
  getGlRowData: (row = {}) => {
    const groupsTableRowData = Object.values(row).length ? get().groupsTableRows.find(({ name }) => name.toLowerCase() === row.col1.toLowerCase()) : {};
    set({ groupsTableRowData });
  }
})));

export default useGroupsList;
