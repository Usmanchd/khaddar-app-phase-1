import React, { Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter } from 'react-router-dom';
import { Detector } from 'react-detect-offline';
import offlinejpg from './assets/offline.jpg';
import './index.css';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Detector
      render={({ online }) =>
        online ? (
          <Provider store={store}>
            <HashRouter>
              <App />
            </HashRouter>
          </Provider>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <img src={offlinejpg} width="40%" />
          </div>
        )
      }
    />
  </React.StrictMode>,
  document.getElementById('root')
);
