import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import KeplerMap from './components/KeplerMap';

export default function App(){
  return (
    <Provider store={store}>
      <h2>Historic (pooled) — risk_label</h2>
      <KeplerMap
        id="historic"
        dataUrl="/data/campus_points_with_scores.geojson"
        label="Historic pooled"
        centerMap={true}
        height={500}
      />

      <h2 style={{marginTop:24}}>Prediction — risk_next_tier</h2>
      <KeplerMap
        id="prediction"
        dataUrl="/data/campus_points_with_scores.geojson"
        label="Prediction"
        centerMap={false}
        height={500}
      />
    </Provider>
  );
}