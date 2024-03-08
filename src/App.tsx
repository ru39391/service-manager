import { FC, useEffect } from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/400.css';

import Home from './pages/home/Home';
import Parser from './pages/parser/Parser';

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
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/parser' element={<Parser />} />
      </Routes>
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App;
