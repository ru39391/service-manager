import { shallow } from 'zustand/shallow';
import useDepts from '../store/DeptsStore';
import NavItem from './NavItem';
import { Box, List } from '@mui/material';

function Nav() {
  const {
    depts,
    navExpanders,
    currNavItem,
    expandChildren,
    setCurrNavItem,
  } = useDepts(
    (state) => ({
      depts: state.depts,
      navExpanders: state.navExpanders,
      currNavItem: state.currNavItem,
      expandChildren: state.expandChildren,
      setCurrNavItem: state.setCurrNavItem,
    }),
    shallow
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        maxWidth: 450,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '4px 0 16px 0 rgba(0,0,0,.045)',
        bgcolor: 'background.default',
      }}
    >
    <List
      component="nav"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        '&:hover': {
          overflowY: 'scroll',
        },
      }}
    >
      {depts.map(
        ({ id, name, subdepts }) =>
        <NavItem
          key={id}
          id={id}
          name={name}
          subdepts={subdepts}
          expandChildren={expandChildren}
          setCurrNavItem={setCurrNavItem}
          expanders={navExpanders}
          current={currNavItem}
        />
      )}
    </List>
  </Box>
  )
};

export default Nav;
