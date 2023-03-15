import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import tableData from '../utils/TableData';

const useTableData = create(devtools((set, get) => ({
  tableCols: [],
  tableRows: [],
  tableRowData: {},
  getArrLength: (arr) => arr.length ? Object.keys(arr[0]).length : 0,
  setData: (colsArr, rowsArr) => {
    const poppedCount = get().getArrLength(colsArr) - get().getArrLength(rowsArr);
    set({
      tableCols: colsArr.length ? tableData.setColumns(colsArr, poppedCount) : get().tableCols,
      tableRows: rowsArr.length ? tableData.setRows(rowsArr) : get().tableRows,
    })
  },
  renderDeptsRows: (arr, depts) => {
    const findItem = (arr, value) => arr.find(({ id }) => id === value);
    const handledArr = arr.map(({ id, name, price, dept, subdept, group }, index) => {
      const { subdepts, groups } = findItem(depts, dept);
      const data = {
        id: index + 1,
        name,
        price,
        dept: findItem(depts, dept).name,
        subdept: findItem(Object.values(subdepts), subdept).name,
        group: group ? findItem(Object.values(groups), group).name : group,
      };
      const handledData = {};

      Object.values(data).forEach((item, idx) => { if(item !== undefined) handledData[Object.keys(data)[idx]] = item });

      return handledData;
    });

    return arr.length && depts.length ? get().setData(arr, handledArr) : get().setData(get().tableCols, get().tableRows);
  },
  filterDeptsRows: (arr, depts, data) => {
    const { id, type } = data;
    get().renderDeptsRows(arr.filter(item => item[type] === id), depts);
  },
  getRowData: (data = {}) => {
    const { arr = [], row = {} } = data;
    const tableRowData = Object.values(row).length && arr.length ? arr.find(({ name }) => name.toLowerCase() === row.col1.toLowerCase()) : {};
    set({ tableRowData });
  }
})));

export default useTableData;
