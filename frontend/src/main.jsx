import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './store';
import MapPage from './MapPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <MapPage />
  </Provider>
);