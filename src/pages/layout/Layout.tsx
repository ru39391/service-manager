import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

import Preloader from '../../components/Preloader';
import AlertError from '../../components/AlertError';

interface ILayout {
  children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <Box sx={{ bgcolor: 'background.body', height: '100vh' }}>
      <Preloader />
      <AlertError />
      <Box sx={{ p: 2 }}>{children}</Box>
    </Box>
  )
};

export default Layout;
