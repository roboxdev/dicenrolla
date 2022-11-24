import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyles } from './global-styles';
import { App } from './App';
import { appStarted } from './models/app';

import './models/init';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);

appStarted();
