import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import useDepts from '../store/DeptsStore';
import usePriceList from '../store/PriceListStore';
import useTableData from '../store/TableDataStore';
import DataTable from './DataTable';

function PriceList() {
  const {
    depts,
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
    pricelist,
    priceTableCols,
    priceTableRows,
    handlePlRows,
    setCurrentRows,
    getPlRowData,
    priceTableRowData,
  } = usePriceList(
    (state) => ({
      pricelist: state.pricelist,
      priceTableCols: state.priceTableCols,
      priceTableRows: state.priceTableRows,
      handlePlRows: state.handlePlRows,
      setCurrentRows: state.setCurrentRows,
      getPlRowData: state.getPlRowData,
      priceTableRowData: state.priceTableRowData,
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
    renderDeptsRows(pricelist, depts);
  }, [pricelist]);

  useEffect(() => {
    //filterRows(pricelist, depts, currNavItem);
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

export default PriceList;
