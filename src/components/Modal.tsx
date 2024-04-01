import { FC, useEffect, forwardRef } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
} from '@mui/material';

import useModal from '../hooks/useModal';

import { useSelector } from '../services/hooks';

const Transition = forwardRef(function Transition(props, ref) {
  //@ts-expect-error
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal: FC = () => {
  const { isOpen, modalTitle, modalDesc } = useSelector(state => state.modal);

  const { modalContent, toggleModal } = useModal();

  return (
    <Dialog
      open={isOpen}
      maxWidth="sm"
      fullWidth={true}
      onClose={() => toggleModal(null)}
      //@ts-expect-error
      TransitionComponent={Transition}
      keepMounted
    >
      {modalTitle && <DialogTitle>{modalTitle}</DialogTitle>}
      <DialogContent>
        {modalDesc && <DialogContentText>{modalDesc}</DialogContentText>}
        {modalContent}
      </DialogContent>
      {/*
      <DialogActions>
        <Button onClick={() => toggleModal(null)}>Закрыть</Button>
      </DialogActions>
      */}
    </Dialog>
  )
}

export default Modal;
