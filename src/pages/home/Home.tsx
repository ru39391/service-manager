import { FC } from 'react';
import { Grid } from '@mui/material';

import Layout from '../layout/Layout';
import Nav from '../../components/Nav';

const Home: FC = () => {
  return (
    <Layout>
      <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Nav />
      </Grid>
    </Layout>
  )
};

export default Home;
