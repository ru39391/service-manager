import { FC, ReactNode } from 'react';
import { Grid } from '@mui/material';

import Preloader from './Preloader';
import AlertError from './AlertError';
import Modal from './Modal';

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
      <Modal />
    </>
  )
};

export default Layout;
