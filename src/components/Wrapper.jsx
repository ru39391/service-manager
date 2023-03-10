import { useEffect } from 'react';
import usePricelist from '../store/PlStore';
import { shallow } from 'zustand/shallow';
import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


function Wrapper() {
  const {
    pricelist,
    priceTableCols,
    priceTableRows
  } = usePricelist(
    (state) => ({
      pricelist: state.pricelist,
      priceTableCols: state.priceTableCols,
      priceTableRows: state.priceTableRows,
    }),
    shallow
  );

  return (
    <Container maxWidth="lg">
      <div style={{ height: 800, width: "100%" }}>
        <DataGrid rows={priceTableRows} columns={priceTableCols} />
      </div>
    </Container>
  )
}

export default Wrapper
