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
import { Close, DeleteOutlined } from '@mui/icons-material';

import useModal from '../hooks/useModal';

import { useSelector, useDispatch } from '../services/hooks';
import { setFormData } from '../services/slices/form-slice';

import type { TItemData } from '../types';

import {
  NAME_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  REMOVE_TITLE,
  REMOVE_CONFIRM_MSG
} from '../utils/constants';

interface IModal {
  fc?: FunctionComponent;
}

const Transition = forwardRef(function Transition(props, ref) {
  //@ts-expect-error
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal: FC<IModal> = ({ fc }) => {
  const dispatch = useDispatch();
  const {
    isVisible,
    formData,
    formTitle,
    formDesc
  } = useSelector(state => state.form);

  const { modalContent, toggleModal } = useModal(fc);

  const closeModal = () => {
    const isSucceed = false;

    toggleModal(null);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ isSucceed: !isSucceed });
      }, 200);
    });
  }

  const openConfirmModal = async (payload: { data: TItemData; type: string; } | null) => {
    if(!payload) {
      return;
    }

    const { data, type } = payload;

    try {
      //@ts-expect-error
      const { isSucceed } = await closeModal();

      if(isSucceed) {
        toggleModal({
          title: `${REMOVE_TITLE} ${data[NAME_KEY] && (`«${data[NAME_KEY]}»`)}`,
          desc: `${REMOVE_CONFIRM_MSG} ${REMOVE_TITLE.toLocaleLowerCase()} ${data[NAME_KEY] && (`«${data[NAME_KEY]}»`)}?`
        });

        dispatch(setFormData({
          data: {
            action: REMOVE_ACTION_KEY,
            type,
            data
          }
        }));
      }
    } catch (error) {
      console.error(error);
    }
  }

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
          <span>
            {formTitle}
            {formData && formData.action === EDIT_ACTION_KEY
              ? <IconButton
                  sx={{ p: 1, color: 'red' }}
                  onClick={() => openConfirmModal(formData ? { data: formData.data as TItemData, type: formData.type as string } : null)}
                >
                  <DeleteOutlined fontSize="medium" />
                </IconButton>
              : ''
            }
          </span>
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
