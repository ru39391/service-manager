import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import tableData from '../utils/TableData';

const useGroupsList = create(devtools((set, get) => ({
  groupsTableCols: [],
  groupsTableRows: [],
  groupsTableRowData: {},
  setGlRows: (arr) => set({ groupsTableRows: tableData.setRows(arr) }),
  handleGlRows: (depts, groups) => {
    const findItem = (array, value) => array.find(({ id }) => id === value);

    const deptsArr = depts.map(({ id, name, subdepts }) => ({ id, name, subdepts }));
    const groupsArr = groups.map(({ name, dept, subdept }, index) => {
      const { name: deptName, subdepts } = findItem(deptsArr, dept);
      const { name: subDeptName } = findItem(Object.values(subdepts), subdept);
      return {
        id: index + 1,
        name,
        dept: deptName,
        subdept: subDeptName,
      };
    });
    get().setGlRows(groupsArr);
    set({ groupsTableCols: tableData.setColumns(groups, 3) });
  },
  setCurrentRows: (data, depts, groups) => {
    console.log(data);
    const { id, type } = data;
    get().handleGlRows(depts, groups.filter(item => item[type] === id));
  },
  getGlRowData: (row = {}) => {
    const groupsTableRowData = Object.values(row).length ? get().groupsTableRows.find(({ name }) => name.toLowerCase() === row.col1.toLowerCase()) : {};
    set({ groupsTableRowData });
  }
})));

export default useGroupsList;
