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
        top: 24,
        height: '100%',
        maxHeight: '100vh',
        position: 'sticky',
        overflow: 'hidden',
        boxShadow: '4px 0 16px 0 rgba(0,0,0,.045)',
        bgcolor: 'background.default',
      }}
    >
      {depts.length > 0 && <List
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
              key={Number(item_id as number).toString()}
              id={item_id as number}
              name={name as string}
              categoryIds={categoryIds}
              currCategoryId={currCategory as number}
              categoryData={categoryData}
              setSubNav={setSubNav}
            />
        )}
      </List>}
    </Box>
  )
};

export default Nav;
