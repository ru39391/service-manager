import { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Nav from './Nav';
import Wrapper from './Wrapper';
import { Box, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DEFAULT_DOC_TITLE } from '../utils/constants';
import '@fontsource/roboto/400.css';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
    }
  });

  useEffect(() => {
    document.title = DEFAULT_DOC_TITLE;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container spacing={4}>
        <Grid item xs={3} sx={{ maxWidth: 450 }}><Nav /></Grid>
        <Grid item xs><Wrapper /></Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App
