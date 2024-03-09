import { FC, useEffect } from 'react';
import {
  Outlet,
  Routes,
  Route
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/400.css';

import Home from './pages/Home';
import Parser from './pages/Parser';
import Category from './pages/Category';
import SubdeptsList from './pages/SubdeptsList';

import { useSelector, useDispatch } from './services/hooks';
import { fetchPricelistData } from './services/actions/pricelist';

import {
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TYPES,
  DEFAULT_DOC_TITLE
} from './utils/constants';

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
        <Route path={`/${TYPES[DEPT_KEY]}`} element={<Outlet />}>
          <Route index element={<SubdeptsList />} />
          <Route path=':id' element={<Category />} />
        </Route>
        <Route path={`/${TYPES[SUBDEPT_KEY]}`} element={<Outlet />}>
          <Route index element={<SubdeptsList />} />
          <Route path=':id' element={<Category />} />
        </Route>
        <Route path={`/${TYPES[GROUP_KEY]}`} element={<Outlet />}>
          <Route index element={<SubdeptsList />} />
          <Route path=':id' element={<Category />} />
        </Route>
        <Route path={`/${TYPES[ITEM_KEY]}`} element={<Outlet />}>
          <Route index element={<SubdeptsList />} />
          <Route path=':id' element={<Category />} />
        </Route>
        <Route path='/parser' element={<Parser />} />
      </Routes>
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App;
