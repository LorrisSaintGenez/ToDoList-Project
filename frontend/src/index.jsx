import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './config/reducers.js';
import RootView from './containers/root-view/index.jsx';

ReactDOM.render(
  <Provider store={ createStore(reducers) }>
    <RootView />
  </Provider>,
  document.getElementById('root')
);
