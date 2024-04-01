import { FC } from 'react';
import { Box, Button, DialogContent, DialogContentText } from '@mui/material';
import { Delete } from '@mui/icons-material';

import useModal from '../hooks/useModal';
import { NOT_EMPTY_CATEGORY } from '../utils/constants';

interface IModalFooter {
  actionBtnCaption: string;
  introText: string;
  actionHandler: () => void;
}

const ModalFooter: FC<IModalFooter> = ({ actionBtnCaption, introText, actionHandler }) => {
  const { toggleModal } = useModal();

  return (
    <>
      {introText && <DialogContentText sx={{ mb: 4 }}>{NOT_EMPTY_CATEGORY}{introText}.</DialogContentText>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<Delete />}
          onClick={actionHandler}
        >
          {actionBtnCaption}
        </Button>
        <Button
          variant="outlined"
          onClick={() => toggleModal(null)}
        >
          Отмена
        </Button>
      </Box>
    </>
  )
}

export default ModalFooter;
