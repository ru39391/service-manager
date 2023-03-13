import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import useGroupsList from '../store/GroupsStore';
import DataTable from './DataTable';

function GroupsList({ depts, groups }) {
  const {
    groupsTableCols,
    groupsTableRows,
    groupsTableRowData,
    handleGlRows,
    getGlRowData,
  } = useGroupsList(
    (state) => ({
      groupsTableCols: state.groupsTableCols,
      groupsTableRows: state.groupsTableRows,
      groupsTableRowData: state.groupsTableRowData,
      handleGlRows: state.handleGlRows,
      getGlRowData: state.getGlRowData,
    }),
    shallow
  );

  useEffect(() => {
    handleGlRows(depts);
  }, [groups]);

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
