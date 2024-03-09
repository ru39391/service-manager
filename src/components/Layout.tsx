import { FC, ReactNode } from 'react';
import { Box, Grid } from '@mui/material';

import Preloader from './Preloader';
import AlertError from './AlertError';

interface ILayout {
  children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <Box sx={{ height: '100vh', bgcolor: 'background.body' }}>
      <Preloader />
      <AlertError />
      <Grid container sx={{ height: '100%', px: 2, py: 3 }}>{children}</Grid>
    </Box>
  )
};

export default Layout;
