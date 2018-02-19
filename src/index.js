import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
// import {Provider} from 'react-redux';

import Application from './application';
import './index.css';
// import store from './store';


ReactDOM.render((
  <MuiThemeProvider>
    <BrowserRouter>
      <Application />
    </BrowserRouter>
  </MuiThemeProvider>),
  document.getElementById('app')
);
