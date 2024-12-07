import { FC, ReactNode } from 'react';
import { Box, Button, DialogContentText } from '@mui/material';
import { ButtonOwnProps } from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import { Check } from '@mui/icons-material';

import useModal from '../hooks/useModal';

import { useSelector } from '../services/hooks';

import { PARSER_CONFIRM_MSG } from '../utils/constants';

interface IModalFooter {
  icon: ReactNode | undefined;
  color: ButtonOwnProps['color'] | undefined;
  actionBtnCaption: string;
  introText: string | undefined;
  disabled: boolean;
  isParserData: boolean;
  actionHandler: () => void;
}

const ModalFooter: FC<IModalFooter> = ({
  icon,
  color,
  actionBtnCaption,
  introText,
  disabled,
  isParserData,
  actionHandler
}) => {
  const { isPricelistLoading } = useSelector(state => state.pricelist);

  const { toggleModal } = useModal();

  return (
    <>
      {introText && !isParserData && <DialogContentText sx={{ mb: 4 }}>{introText}.</DialogContentText>}
      {isParserData && <DialogContentText sx={{ mb: 4 }}>{PARSER_CONFIRM_MSG}.</DialogContentText>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <LoadingButton
          color={color || 'success'}
          variant="outlined"
          loadingPosition="start"
          startIcon={icon || <Check />}
          loading={isPricelistLoading}
          disabled={disabled}
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
