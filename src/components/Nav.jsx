import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import useNav from '../store/NavStore';
import useDepts from '../store/DeptsStore';
import NavItem from './NavItem';
import {
  List,
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

  const {
    expanders,
    setExpanders,
    currExpander,
    expandChildren
  } = useNav(
    (state) => ({
      expanders: state.expanders,
      currExpander: state.currExpander,
      setExpanders: state.setExpanders,
      expandChildren: state.expandChildren,
    }),
    shallow
  );

  useEffect(() => {
    setExpanders(depts)
  }, [depts]);

  useEffect(() => {
    console.log(expanders.find(item => item.id === currExpander.id));
    console.log(currExpander);
  }, [expanders]);

  return (
    <>
      {isLoading && <LinearProgress />}
      <List component="nav">{depts.map((item) => <NavItem key={item.id} id={item.id} name={item.name} subdepts={item.subdepts} expandChildren={expandChildren} expanders={expanders} />)}</List>
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
