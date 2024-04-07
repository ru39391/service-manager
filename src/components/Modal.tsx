import {
  FC,
  forwardRef,
  FunctionComponent
} from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
  IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';

import useModal from '../hooks/useModal';

import { useSelector } from '../services/hooks';

interface IModal {
  fc?: FunctionComponent;
}

const Transition = forwardRef(function Transition(props, ref) {
  //@ts-expect-error
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal: FC<IModal> = ({ fc }) => {
  const { isVisible, formTitle, formDesc } = useSelector(state => state.form);

  const { modalContent, toggleModal } = useModal(fc);

  return (
    <Dialog
      open={isVisible}
      maxWidth="sm"
      fullWidth={true}
      onClose={() => toggleModal(null)}
      //@ts-expect-error
      TransitionComponent={Transition}
      keepMounted
    >
      {formTitle &&
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          <span>{formTitle}</span>
          <IconButton
            sx={{
              p: 1,
              color: 'text.secondary'
            }}
            size="small"
            aria-label="close"
            onClick={() => toggleModal(null)}
          >
            <Close />
          </IconButton>
        </DialogTitle>
      }
      <DialogContent>
        {formDesc && <DialogContentText>{formDesc}</DialogContentText>}
        {modalContent}
      </DialogContent>
    </Dialog>
  )
}

export default Modal;
