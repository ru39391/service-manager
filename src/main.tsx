import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';

import { Provider } from 'react-redux';
import store from './services/store';

import { ROOT_PATH } from './utils/constants';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={ROOT_PATH}>
    <React.StrictMode>
      <Provider store={store}><App /></Provider>
    </React.StrictMode>
  </BrowserRouter>,
)
