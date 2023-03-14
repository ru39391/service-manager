import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import useDepts from '../store/DeptsStore';
import usePriceList from '../store/PriceListStore';
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

  useEffect(() => {
    handlePlRows(depts);
  }, [pricelist]);

  useEffect(() => {
    setCurrentRows(currNavItem, depts);
  }, [currNavItem]);

  return (
    <DataTable
      tableCols={priceTableCols}
      tableRows={priceTableRows}
      rowData={priceTableRowData}
      getRowData={getPlRowData}
    />
  )
}

export default PriceList;
