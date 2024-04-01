import { FC } from 'react';
import { IconButton, Snackbar, Alert } from '@mui/material';
import { Close } from '@mui/icons-material';

import { useSelector } from '../services/hooks';

const AlertError: FC = () => {
  const {
    fileErrorMsg,
    pricelistErrorMsg
  } = useSelector(({ file, pricelist }) => ({
    fileErrorMsg: file.errorMsg,
    pricelistErrorMsg: pricelist.errorMsg
  }));
  const errorMsg = fileErrorMsg || pricelistErrorMsg;

  return (
    <>
      {errorMsg && <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        open
        autoHideDuration={6000}
        message={errorMsg}
        key="error"
      >
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>{errorMsg}</Alert>
        {/*
        // TODO: добавить кнопку, чтобы закрывать уведомление, скрывать уведомление через интервал
        // TODO: настроить поочерёдное отображение группы уведомлений
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
        >
          <Close fontSize="small" />
        </IconButton>
        */}
      </Snackbar>}
    </>
  )
};

export default AlertError;
