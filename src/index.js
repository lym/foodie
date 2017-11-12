import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';

import Application from './application';
import './index.css';


ReactDOM.render((
  <MuiThemeProvider>
    <BrowserRouter>
    <Application />
    </BrowserRouter>
  </MuiThemeProvider>),
  document.getElementById('app')
);
