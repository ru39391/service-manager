import { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Nav from './Nav';
import Wrapper from './Wrapper';
import Preloader from './Preloader';
import AlertError from './AlertError';
import { Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DEFAULT_DOC_TITLE } from '../utils/constants';
import '@fontsource/roboto/400.css';

function App() {
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
      <CssBaseline />
      <Preloader />
      <AlertError />
      <Grid
        container
        sx={{
          bgcolor: 'background.body',
        }}
      >
        <Grid item xs={3} sx={theme.custom.dFlexColumn}><Nav /></Grid>
        <Grid item xs={9}><Wrapper /></Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App;
