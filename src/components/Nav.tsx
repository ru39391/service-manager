import { FC } from 'react';
import { Box, List } from '@mui/material';

import NavItem from './NavItem';

import useSubNav from '../hooks/useSubNav';

import { useSelector } from '../services/hooks';

const Nav: FC = () => {
  const {
    depts,
    subdepts,
  } = useSelector(state => state.pricelist);

  const {
    categoryIds,
    currCategory,
    categoryData,
    setSubNav
  } = useSubNav(subdepts);

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
          ({ item_id, name }) =>
            <NavItem
              key={item_id.toString()}
              id={item_id as number}
              name={name.toString()}
              categoryIds={categoryIds}
              currCategoryId={currCategory as number}
              categoryData={categoryData}
              setSubNav={setSubNav}
            />
        )}
      </List>
    </Box>
  )
};

export default Nav;
