import {configureStore} from '@reduxjs/toolkit';
import keplerGlReducer from '@kepler.gl/reducers';

export const store = configureStore({
  reducer: { keplerGl: keplerGlReducer },
  middleware: (getDefault) =>
    getDefault({ serializableCheck: false, immutableCheck: false }),
  devTools: true
});