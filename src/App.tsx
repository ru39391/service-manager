import React, { FC, useEffect } from 'react';
import { Grid } from '@mui/material';
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
      <Grid
        container
        direction='column'
        sx={{
          p: 2,
          bgcolor: 'background.body',
        }}
      >
        <Parser />
      </Grid>
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App;
