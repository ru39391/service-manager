import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import useResList from '../store/ResStore';
import DataTable from './DataTable';

function ResList({ depts, groups }) {
  const {
    resTableCols,
    resTableRows,
    resTableRowData,
    handleRlRows,
    getRlRowData,
  } = useResList(
    (state) => ({
      resTableCols: state.resTableCols,
      resTableRows: state.resTableRows,
      resTableRowData: state.resTableRowData,
      handleRlRows: state.handleRlRows,
      getRlRowData: state.getRlRowData,
    }),
    shallow
  );

  useEffect(() => {
    handleRlRows(depts);
  }, [groups]);

  return (
    <DataTable
      tableCols={resTableCols}
      tableRows={resTableRows}
      rowData={resTableRowData}
      getRowData={getRlRowData}
    />
  )
}

export default ResList;
