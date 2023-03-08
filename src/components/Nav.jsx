import { shallow } from 'zustand/shallow';
import useDepts from '../store/DeptsStore';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  LinearProgress,
  Snackbar,
  Alert
} from '@mui/material';

function Nav() {
  const { depts, isLoading, error } = useDepts(
    (state) => ({
      depts: state.depts,
      isLoading: state.isLoading,
      error: state.error,
    }),
    shallow
  );

  function showBtnData(data) {
    console.log(data);
  }

  function renderNav(data) {
    const { id, name } = data;
    return <ListItemButton key={id.toString()} onClick={() => showBtnData(data)}><ListItemText primary={name} /></ListItemButton>;
  }

  return (
    <>
      {isLoading && <LinearProgress />}
      <List component="nav">{depts.map((item) => renderNav(item))}</List>
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

export default Nav
