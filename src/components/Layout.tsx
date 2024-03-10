import { FC, ReactNode } from 'react';
import { Box, Grid } from '@mui/material';

import Preloader from './Preloader';
import AlertError from './AlertError';

interface ILayout {
  children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <>
      <Preloader />
      <AlertError />
      <Grid
        container
        sx={{
          px: 2,
          py: 3,
          bgcolor: 'background.body'
        }}
      >
        {children}
      </Grid>
    </>
  )
};

export default Layout;
