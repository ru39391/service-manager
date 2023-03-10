import { useEffect, forwardRef } from 'react';
import { shallow } from 'zustand/shallow';
import useDepts from '../store/DeptsStore';
import usePricelist from '../store/PlStore';
import NoRowsOverlay from './NoRowsOverlay';
import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Wrapper() {
  const depts = useDepts(state => state.depts);
  const {
    pricelist,
    priceTableCols,
    priceTableRows,
    handlePlRows,
    getPlRowData,
  } = usePricelist(
    (state) => ({
      pricelist: state.pricelist,
      priceTableCols: state.priceTableCols,
      priceTableRows: state.priceTableRows,
      handlePlRows: state.handlePlRows,
      getPlRowData: state.getPlRowData,
    }),
    shallow
  );

  useEffect(() => {
    handlePlRows(depts);
  }, [pricelist]);

  return (
    <Container maxWidth="lg">
      <DataGrid
        sx={{ height: '100vh' }}
        rows={priceTableRows}
        columns={priceTableCols}
        onRowClick={({ row }) => {getPlRowData(row)}}
        slots={{ noRowsOverlay: NoRowsOverlay }}
      />
      {/*
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
      */}
    </Container>
  )
}

export default Wrapper;
