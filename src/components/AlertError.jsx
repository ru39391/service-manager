import useDepts from '../store/DeptsStore';
import { Snackbar, Alert } from '@mui/material';

function AlertError() {
  const error = useDepts(state => state.error);

  return (
    <>
      {error && <Snackbar
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        open
        autoHideDuration={6000}
        message={error}
        key="error"
      >
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>{error}</Alert>
      </Snackbar>}
    </>
  )
}

export default AlertError;
