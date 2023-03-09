import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton
} from '@mui/material';
import {
  FolderOpen,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';

function NavItem({ id, name, subdepts, expandChildren, expanders }) {
  const subdeptsArr = Object.values(subdepts);
  const isExpanded = expanders.length ? expanders[id - 1].id === id && expanders[id - 1].isExpanded : Boolean(expanders.length);

  return (
    <>
      <ListItemButton sx={{ py: 0.5 }}>
        <ListItemIcon>
          <FolderOpen fontSize="small" sx={{ color: 'info.light' }} />
        </ListItemIcon>
        <ListItemText sx={{ mr: 1 }} primary={name} />
        {subdeptsArr.length && <IconButton onClick={() => expandChildren(id)}>
          {isExpanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>}
      </ListItemButton>
      {subdeptsArr.length && <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subdeptsArr.map(
            (item) => <ListItemButton
              key={item.id.toString()}
              sx={{ pl: 6, color: 'grey.600', fontSize: 14 }}>
                <ListItemText
                  disableTypography
                  sx={{ m: 0 }}
                  primary={item.name}
                />
              </ListItemButton>
          )}
        </List>
      </Collapse>}
    </>
  )
}

export default NavItem;
