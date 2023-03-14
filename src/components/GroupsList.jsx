import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import useDepts from '../store/DeptsStore';
import useGroupsList from '../store/GroupsStore';
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
    groupsTableCols,
    groupsTableRows,
    groupsTableRowData,
    handleGlRows,
    setCurrentRows,
    getGlRowData,
  } = useGroupsList(
    (state) => ({
      groupsTableCols: state.groupsTableCols,
      groupsTableRows: state.groupsTableRows,
      groupsTableRowData: state.groupsTableRowData,
      handleGlRows: state.handleGlRows,
      setCurrentRows: state.setCurrentRows,
      getGlRowData: state.getGlRowData,
    }),
    shallow
  );

  useEffect(() => {
    handleGlRows(depts, groups);
  }, [groups]);

  useEffect(() => {
    setCurrentRows(currNavItem, depts, groups);
  }, [currNavItem]);

  return (
    <DataTable
      tableCols={groupsTableCols}
      tableRows={groupsTableRows}
      rowData={groupsTableRowData}
      getRowData={getGlRowData}
    />
  )
}

export default GroupsList;
