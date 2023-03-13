import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import usePricelist from '../store/PlStore';
import DataTable from './DataTable';

function Pricelist({ depts, currChapter }) {
  const {
    pricelist,
    priceTableCols,
    priceTableRows,
    handlePlRows,
    setCurrentRows,
    getPlRowData,
    priceTableRowData,
  } = usePricelist(
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
    setCurrentRows(currChapter, depts);
  }, [currChapter]);

  return (
    <DataTable
      tableCols={priceTableCols}
      tableRows={priceTableRows}
      rowData={priceTableRowData}
      getRowData={getPlRowData}
    />
  )
}

export default Pricelist;
