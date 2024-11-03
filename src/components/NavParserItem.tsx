import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { FolderOpen } from '@mui/icons-material';

import { PARSER_KEY, PARSER_TITLE } from '../utils/constants';

const NavParserItem: FC = () => {
  return (
    <ListItem
      component={NavLink}
      to={`/${PARSER_KEY}`}
      sx={{ py: 0.5, color: 'text.primary' }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ListItemIcon><FolderOpen fontSize="small" sx={{ color: 'info.light' }} /></ListItemIcon>
        <ListItemText primary={PARSER_TITLE} sx={{ mr: 1 }} />
      </Box>
    </ListItem>
  )
};

export default NavParserItem;
