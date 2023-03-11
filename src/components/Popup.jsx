import { forwardRef } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
} from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Popup({ data }) {
  return (
    <Dialog
      open
      TransitionComponent={Transition}
      keepMounted
      //onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description" component="ul">
          {/* Object.values(data).map((item, index) => <Box component="li" key={index}>{item}</Box>) */}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button>Disagree</Button>
        <Button>Agree</Button>
        {/*
        onClick={handleClose}
        */}
      </DialogActions>
    </Dialog>
  )
};

export default Popup;
