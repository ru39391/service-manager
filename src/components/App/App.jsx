import { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import api from '../../utils/Api';
import storage from '../../utils/Storage';
import { DEFAULT_DOC_TITLE } from '../../utils/constants';
import '@fontsource/roboto/400.css';

function App() {
  const [deptsList, setDeptsList] = useState([]);
  const [docTitle, setDocTitle] = useState(DEFAULT_DOC_TITLE);

  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  function handleDepts() {
    api.getDepts()
      .then(res => {
        const { data } = res;
        const depts = storage.handleData('depts', data);
        setDeptsList(depts);

        const { name } = depts[0];
        setDocTitle(name);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    handleDepts();
  }, []);

  useEffect(() => {
    document.title = docTitle;
  }, [deptsList]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
      </div>
    </ThemeProvider>
  )
}

export default App
