import React, { FC, useEffect } from 'react';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/400.css';

import Parser from './components/Parser';
import Preloader from './components/Preloader';
import AlertError from './components/AlertError';

import { useSelector, useDispatch } from './services/hooks';
import { fetchPricelistData } from './services/actions/pricelist';

import { DEFAULT_DOC_TITLE } from './utils/constants';

const App: FC = () => {
  const dispatch = useDispatch();
  const { isPricelistSucceed, isPricelistFailed } = useSelector(state => state.pricelist);
  const theme = createTheme({
    palette: {
      mode: 'light',
      background: {
        //@ts-expect-error
        body: '#F4F5FA'
      }
    },
    custom: {
      dFlexColumn: {
        display: 'flex',
        flexDirection: 'column',
      }
    }
  });

  useEffect(() => {
    document.title = DEFAULT_DOC_TITLE;
  }, []);

  useEffect(() => {
    if(!isPricelistSucceed || !isPricelistFailed) dispatch(fetchPricelistData());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.body', height: '100vh' }}>
        <Preloader />
        <AlertError />
        <Box sx={{ p: 2 }}><Parser /></Box>
      </Box>
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App;
