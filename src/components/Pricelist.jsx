import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import useDepts from '../store/DeptsStore';
import usePriceList from '../store/PriceListStore';
import useTableData from '../store/TableDataStore';
import DataTable from './DataTable';

function PriceList() {
  const {
    pricelist
  } = usePriceList(
    (state) => ({
      pricelist: state.pricelist
    }),
    shallow
  );

  const {
    depts,
    currNavItem,
  } = useDepts(
    (state) => ({
      depts: state.depts,
      currNavItem: state.currNavItem,
    }),
    shallow
  );

  const {
    tableCols,
    tableRows,
    tableRowData,
    renderDeptsRows,
    filterDeptsRows,
    getRowData,
  } = useTableData(
    (state) => ({
      tableCols: state.tableCols,
      tableRows: state.tableRows,
      tableRowData: state.tableRowData,
      renderDeptsRows: state.renderDeptsRows,
      filterDeptsRows: state.filterDeptsRows,
      getRowData: state.getRowData,
    }),
    shallow
  );

  useEffect(() => {
    renderDeptsRows(pricelist, depts);
  }, [pricelist]);

  useEffect(() => {
    filterDeptsRows(pricelist, depts, currNavItem);
  }, [currNavItem]);

  return (
    <DataTable
      src={pricelist}
      tableCols={tableCols}
      tableRows={tableRows}
      rowData={tableRowData}
      getRowData={getRowData}
    />
  )
}

export default PriceList;
