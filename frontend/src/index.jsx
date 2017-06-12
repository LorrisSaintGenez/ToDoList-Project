import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './config/reducers.js';
import RootView from './containers/root-view/index.jsx';

ReactDOM.render(
  <Provider store={store}>
    <RootView />
  </Provider>,
  document.getElementById('root')
);
