import {
  FC,
  forwardRef,
  FunctionComponent
} from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';

import DeleteIconBtn from './DeleteIconBtn';

import useModal from '../hooks/useModal';
import useUrlHandler from '../hooks/useUrlHandler';

import { useSelector, useDispatch } from '../services/hooks';
import { setFormData } from '../services/slices/form-slice';

import type { TItemData } from '../types';

import {
  NAME_KEY,
  REMOVE_ACTION_KEY,
  REMOVE_TITLE,
  REMOVE_CONFIRM_MSG
} from '../utils/constants';

interface IModal {
  fc?: FunctionComponent;
  payload?: {};
}

const Transition = forwardRef(function Transition(props, ref) {
  //@ts-expect-error
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal: FC<IModal> = ({ fc, payload }) => {
  const dispatch = useDispatch();
  const {
    isVisible,
    formData,
    formTitle,
    formDesc
  } = useSelector(state => state.form);

  const { currUrlData } = useUrlHandler();
  const { modalContent, toggleModal } = useModal({ fc, payload });

  const closeModal = (): Promise<{ isSucceed: boolean; }> => {
    const isSucceed = false;

    toggleModal(null);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ isSucceed: !isSucceed });
      }, 200);
    });
  }

  const openConfirmModal = async (payload: { data: TItemData; type: string; isParserData: boolean; } | null) => {
    if(!payload) {
      return;
    }

    const { data, type, isParserData } = payload;

    console.log({ data, type, isParserData });

    try {
      const { isSucceed } = await closeModal();

      if(isSucceed) {
        dispatch(setFormData({
          data: {
            action: REMOVE_ACTION_KEY,
            type,
            data
          }
        }));

        if(isParserData) {
          // TODO: настроить удаление элемента из списка обработанного документа
          toggleModal(null);
          console.log({
            data: {
              action: REMOVE_ACTION_KEY,
              type,
              data
            }
          });
        } else {
          toggleModal({
            title: `${REMOVE_TITLE} ${data[NAME_KEY] && (`«${data[NAME_KEY]}»`)}`,
            desc: `${REMOVE_CONFIRM_MSG} ${REMOVE_TITLE.toLocaleLowerCase()} ${data[NAME_KEY] && (`«${data[NAME_KEY]}»`)}?`
          });
        }
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
            <DeleteIconBtn formData={formData} urlData={currUrlData} openModal={openConfirmModal} />
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
