import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import useDepts from '../store/DeptsStore';
import useTableData from '../store/TableDataStore';
import DataTable from './DataTable';

function GroupsList() {
  const {
    depts,
    groups,
    currNavItem,
  } = useDepts(
    (state) => ({
      depts: state.depts,
      groups: state.groups,
      currNavItem: state.currNavItem,
    }),
    shallow
  );

  const {
    tableCols,
    tableRows,
    tableRowData,
    renderDeptsRows,
    filterRows,
    getRowData,
  } = useTableData(
    (state) => ({
      tableCols: state.tableCols,
      tableRows: state.tableRows,
      tableRowData: state.tableRowData,
      renderDeptsRows: state.renderDeptsRows,
      filterRows: state.filterRows,
      getRowData: state.getRowData,
    }),
    shallow
  );

  useEffect(() => {
    renderDeptsRows(groups, depts);
  }, [groups]);

  useEffect(() => {
    //filterRows(currNavItem, depts, groups);
  }, [currNavItem]);

  return (
    <DataTable
      tableCols={tableCols}
      tableRows={tableRows}
      rowData={tableRowData}
      getRowData={getRowData}
    />
  )
}

export default GroupsList;
