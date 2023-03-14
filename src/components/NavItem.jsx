import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  FolderOpen,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import { DEPT_TYPE_NAME, SUBDEPT_TYPE_NAME } from '../utils/config';

function NavItem({
  id,
  name,
  subdepts,
  expandChildren,
  setCurrNavItem,
  expanders,
  current,
}) {
  const { id: currentId, type } = current;
  const subdeptsArr = Object.values(subdepts);
  const isExpanded = expanders.length ? expanders[id - 1].id === id && expanders[id - 1].isExpanded : Boolean(expanders.length);

  return (
    <>
      <ListItemButton selected={currentId === id && type === DEPT_TYPE_NAME} sx={{ py: 0.5 }}>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setCurrNavItem({ id, type: DEPT_TYPE_NAME })}
        >
          <ListItemIcon><FolderOpen fontSize="small" sx={{ color: 'info.light' }} /></ListItemIcon>
          <ListItemText sx={{ mr: 1 }} primary={name} />
        </Box>
        {subdeptsArr.length && <IconButton onClick={() => expandChildren(id)}>
          {isExpanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>}
      </ListItemButton>
      {subdeptsArr.length && <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subdeptsArr.map(
            ({ id, name }) =>
            <ListItemButton
              key={id.toString()}
              selected={currentId === id && type === SUBDEPT_TYPE_NAME}
              sx={{
                pl: 6,
                color: 'grey.600',
                fontSize: 14,
              }}
              onClick={() => setCurrNavItem({ id, type: SUBDEPT_TYPE_NAME })}
            >
              <ListItemText
                disableTypography
                sx={{ m: 0 }}
                primary={name}
              />
            </ListItemButton>
          )}
        </List>
      </Collapse>}
    </>
  )
};

export default NavItem;
