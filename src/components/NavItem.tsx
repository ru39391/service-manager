import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material';
import {
  DeleteOutlined,
  ExpandLess,
  ExpandMore,
  FolderOpen
} from '@mui/icons-material';

import useModal from '../hooks/useModal';
import useUrlHandler from '../hooks/useUrlHandler';

import { useDispatch } from '../services/hooks';
import { setFormData } from '../services/slices/form-slice';

import type { TCustomData } from '../types';

import {
  ID_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  TYPES,
  REMOVE_TITLE,
  REMOVE_CONFIRM_MSG,
  REMOVE_ACTION_KEY
} from '../utils/constants';

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
  const dispatch = useDispatch();

  const { toggleModal } = useModal();
  const { currUrlData } = useUrlHandler();

  /**
   * Изменение текущего URL
   * @property {number} id - item_id категории
   * @property {string} type - тип категории данных ('dept' | 'subdept')
   */
  const changeLoc = (id: number, type: string): void => {
    navigate(`/${TYPES[type]}/${id.toString()}`, { replace: true });
    setCurrSubCategoryId(id);

    if(type === DEPT_KEY) {
      setSubNav(id);
    }
  }

  /**
   * Удаление категории
   * @property {number} id - item_id категории
   * @property {string} name - наименование категории
   */
  const removeCategory = ({id, name}: {id: number; name: string;}) => {
    if(currUrlData.id === id) {
      return;
    }

    toggleModal({
      title: `${REMOVE_TITLE} ${name && (`«${name}»`)}`,
      desc: `${REMOVE_CONFIRM_MSG} ${REMOVE_TITLE.toLocaleLowerCase()} ${name && (`«${name}»`)}?`
    });
    dispatch(setFormData({
      data: {
        action: REMOVE_ACTION_KEY,
        type: TYPES[DEPT_KEY],
        data: { [ID_KEY]: id, name }
      }
    }));
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
          {currUrlData.type === TYPES[DEPT_KEY]
            ? <ListItemIcon onClick={() => removeCategory({id, name})}>
                {currUrlData.id === id
                  ? <FolderOpen fontSize="small" sx={{ color: 'info.light' }} />
                  : <Tooltip placement="top" title={REMOVE_TITLE}><DeleteOutlined fontSize="small" /></Tooltip>
                }
              </ListItemIcon>
            : <ListItemIcon><FolderOpen fontSize="small" sx={{ color: 'info.light' }} /></ListItemIcon>
          }
          <ListItemText
            primary={name}
            sx={{ mr: 1 }}
            onClick={() => changeLoc(id as number, DEPT_KEY)}
          />
        </Box>
        {categoryIds.includes(id)
          && <IconButton onClick={() => setSubNav(id)}>{ currCategoryId === id ? <ExpandLess /> : <ExpandMore /> }</IconButton>
        }
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
