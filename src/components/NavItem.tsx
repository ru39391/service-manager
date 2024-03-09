import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

import type { TCustomData } from '../types';

import { DEPT_KEY, SUBDEPT_KEY, TYPES } from '../utils/constants';

interface INavItem {
  id: number;
  name: string;
  categoryIds: number[];
  currCategoryId: number;
  categoryData: TCustomData<number | string>[];
  setSubNav: (id: number) => void;
}

const NavItem: FC<INavItem> = ({
  id,
  name,
  categoryIds,
  currCategoryId,
  categoryData,
  setSubNav
}) => {
  const [currSubCategoryId, setCurrSubCategoryId] = useState<number | null>(null);
  const navigate = useNavigate();

  const changeLoc = (id: number, key: string): void => {
    navigate(`/${TYPES[key]}/${id.toString()}`, { replace: true });
    setCurrSubCategoryId(id);

    if(key === DEPT_KEY) {
      setSubNav(id);
    }
  }

  return (
    <>
      <ListItemButton selected={currCategoryId === id} sx={{ py: 0.5 }}>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ListItemIcon><FolderOpen fontSize="small" sx={{ color: 'info.light' }} /></ListItemIcon>
          <ListItemText
            primary={name}
            sx={{ mr: 1 }}
            onClick={() => changeLoc(id as number, DEPT_KEY)}
          />
        </Box>
        {categoryIds.includes(id) && <IconButton onClick={() => setSubNav(id)}>
          { currCategoryId === id ? <ExpandLess /> : <ExpandMore /> }
        </IconButton>}
      </ListItemButton>
      {categoryData.length > 0 && <Collapse in={currCategoryId === id} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {categoryData.map(
            ({ item_id, name }) =>
            <ListItemButton
              key={item_id.toString()}
              selected={currSubCategoryId === item_id}
              sx={{
                pl: 6,
                color: 'grey.600',
                fontSize: 14,
              }}
              onClick={() => changeLoc(item_id as number, SUBDEPT_KEY)}
            >
              <ListItemText
                disableTypography
                primary={name}
                sx={{ m: 0 }}
              />
            </ListItemButton>
          )}
        </List>
      </Collapse>}
    </>
  )
};

export default NavItem;
