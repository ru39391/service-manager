import { shallow } from 'zustand/shallow';
import useDepts from '../store/DeptsStore';
import NavItem from './NavItem';
import { List } from '@mui/material';

function Nav() {
  const {
    depts,
    navExpanders,
    expandChildren,
  } = useDepts(
    (state) => ({
      depts: state.depts,
      navExpanders: state.navExpanders,
      expandChildren: state.expandChildren,
    }),
    shallow
  );

  return (
    <List component="nav">
      {depts.map(({ id, name, subdepts }) => <NavItem key={id} id={id} name={name} subdepts={subdepts} expandChildren={expandChildren} expanders={navExpanders} />)}
    </List>
  )
};

export default Nav;
