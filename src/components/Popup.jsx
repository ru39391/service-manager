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

function Popup({ data, closePopup, isOpen }) {
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{`${data.id} - ${data.name}`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description" component="ul">
          {/* Object.values(data).map((item, index) => <Box component="li" key={index}>{item}</Box>) */}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closePopup()}>Disagree</Button>
        <Button>Agree</Button>
      </DialogActions>
    </Dialog>
  )
};

export default Popup;
