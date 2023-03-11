import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import useDepts from '../store/DeptsStore';
import usePricelist from '../store/PlStore';
import Popup from './Popup';
import NoRowsOverlay from './NoRowsOverlay';
import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function Wrapper() {
  const {
    depts,
    currChapter,
  } = useDepts(
    (state) => ({
      depts: state.depts,
      currChapter: state.currChapter,
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
    <Container
      sx={{
        py: 5,
        height: '100vh',
      }}
      maxWidth="lg"
    >
      <DataGrid
        sx={{
          border: 0,
          height: '100%',
          boxShadow: '0 2px 10px 0 rgba(0,0,0,.045)',
          bgcolor: 'background.default',
        }}
        rows={priceTableRows}
        columns={priceTableCols}
        onRowClick={({ row }) => {getPlRowData(row)}}
        slots={{ noRowsOverlay: NoRowsOverlay }}
      />

      {Object.values(priceTableRowData).length && <Popup data={priceTableRowData} />}
    </Container>
  )
}

export default Wrapper;
