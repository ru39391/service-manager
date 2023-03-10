import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import useNav from '../store/NavStore';
import useDepts from '../store/DeptsStore';
import NavItem from './NavItem';
import { List } from '@mui/material';

function Nav() {
  const { depts } = useDepts(
    (state) => ({
      depts: state.depts,
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
    //console.log(expanders.find(item => item.id === currExpander.id));
    //console.log(currExpander);
  }, [expanders]);

  return (
    <List component="nav">
      {depts.map((item) => <NavItem key={item.id} id={item.id} name={item.name} subdepts={item.subdepts} expandChildren={expandChildren} expanders={expanders} />)}
    </List>
  )
}

export default Nav;
