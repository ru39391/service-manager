import React, { FC } from 'react';
import { Snackbar, Alert } from '@mui/material';

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
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        open
        autoHideDuration={6000}
        message={errorMsg}
        key="error"
      >
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>{errorMsg}</Alert>
      </Snackbar>}
    </>
  )
};

export default AlertError;
