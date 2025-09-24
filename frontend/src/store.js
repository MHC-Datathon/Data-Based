import {configureStore} from '@reduxjs/toolkit';
import {applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import keplerGlReducer from 'kepler.gl/reducers';
import {taskMiddleware} from 'kepler.gl/middleware';

// kepler.gl requires the reducer to be mounted under 'keplerGl'
const rootReducer = {
  keplerGl: keplerGlReducer
};

const middlewares = [thunk, taskMiddleware];

if (import.meta.env.MODE !== 'production') {
  middlewares.push(createLogger({collapsed: true}));
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) => getDefault({serializableCheck: false}).concat(middlewares),
  devTools: true
});