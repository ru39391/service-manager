import { FC } from 'react';
import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  FolderOpen,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';

import type { TCustomData, TSubMenuData } from '../types';

interface INavItem {
  id: number;
  name: string;
  deptChildren: number[];
  currCategoryId: number;
  categoryData: TCustomData<number | string>[];
  setSubNav: (data: TSubMenuData) => void;
}

const NavItem: FC<INavItem> = ({
  id,
  name,
  deptChildren,
  currCategoryId,
  categoryData,
  setSubNav
}) => {
  return (
    <>
      <ListItemButton selected={true} sx={{ py: 0.5 }}>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => console.log(deptChildren)}
        >
          <ListItemIcon><FolderOpen fontSize="small" sx={{ color: 'info.light' }} /></ListItemIcon>
          <ListItemText sx={{ mr: 1 }} primary={name} />
        </Box>
        {deptChildren.length && <IconButton onClick={() => setSubNav({  parentId: id, childrenIds: deptChildren })}>
          { currCategoryId === id ? <ExpandLess /> : <ExpandMore /> }
        </IconButton>}
      </ListItemButton>
      {categoryData.length ? <Collapse in={currCategoryId === id} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {categoryData.map(
            ({ item_id, name }) =>
            <ListItemButton
              key={item_id.toString()}
              selected={false}
              sx={{
                pl: 6,
                color: 'grey.600',
                fontSize: 14,
              }}
              onClick={() => console.log(item_id)}
            >
              <ListItemText
                disableTypography
                sx={{ m: 0 }}
                primary={name}
              />
            </ListItemButton>
          )}
        </List>
      </Collapse> : ''}
    </>
  )
};

export default NavItem;
