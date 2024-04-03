import { FC, ReactNode } from 'react';
import { Box, Button, DialogContentText } from '@mui/material';
import { ButtonOwnProps } from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import { Check } from '@mui/icons-material';

import useModal from '../hooks/useModal';

import { useSelector } from '../services/hooks';

interface IModalFooter {
  icon: ReactNode | undefined;
  color: ButtonOwnProps['color'] | undefined;
  actionBtnCaption: string;
  introText: string | undefined;
  actionHandler: () => void;
}

const ModalFooter: FC<IModalFooter> = ({
  icon,
  color,
  actionBtnCaption,
  introText,
  actionHandler
}) => {
  const { isPricelistLoading } = useSelector(state => state.pricelist);
  const { toggleModal } = useModal();

  return (
    <>
      {introText && <DialogContentText sx={{ mb: 4 }}>{introText}.</DialogContentText>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <LoadingButton
          color={color || 'success'}
          variant="outlined"
          loadingPosition="start"
          startIcon={icon || <Check />}
          loading={isPricelistLoading}
          onClick={actionHandler}
        >
          {actionBtnCaption}
        </LoadingButton>
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
