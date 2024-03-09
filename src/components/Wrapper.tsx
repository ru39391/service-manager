import { FC, ReactNode } from 'react';
import { Grid } from '@mui/material';

import Layout from './Layout';
import Header from './Header';
import Nav from './Nav';

import usePageTitle from '../hooks/useHeader';

interface IWrapper {
  children: ReactNode;
}

const Wrapper: FC<IWrapper> = ({ children }) => {
  return (
    <Layout>
      <Grid item xs={3} sx={(theme) => ({ ...theme.custom.dFlexColumn })}><Nav /></Grid>
      <Grid item xs={9} sx={{ pl: 3, pr: 2 }}>
        <Header />
        {children}
      </Grid>
    </Layout>
  )
};

export default Wrapper;
