import { shallow } from 'zustand/shallow';
import useDepts from '../store/DeptsStore';
import NavItem from './NavItem';
import { List } from '@mui/material';

function Nav() {
  const {
    depts,
    navExpanders,
    currChapter,
    expandChildren,
    setCurrChapter,
  } = useDepts(
    (state) => ({
      depts: state.depts,
      navExpanders: state.navExpanders,
      currChapter: state.currChapter,
      expandChildren: state.expandChildren,
      setCurrChapter: state.setCurrChapter,
    }),
    shallow
  );

  return (
    <List component="nav">
      {depts.map(({ id, name, subdepts }) => <NavItem key={id} id={id} name={name} subdepts={subdepts} expandChildren={expandChildren} setCurrChapter={setCurrChapter} expanders={navExpanders} current={currChapter} />)}
    </List>
  )
};

export default Nav;
