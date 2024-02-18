import React, { FC, useEffect } from 'react';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/400.css';

import Parser from './components/Parser';

import { DEFAULT_DOC_TITLE } from './utils/constants';

const App: FC = () => {
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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2, bgcolor: 'background.body', height: '100vh' }}><Parser /></Box>
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App;
