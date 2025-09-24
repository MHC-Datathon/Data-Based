import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import KeplerMap from './components/KeplerMap';
// src/App.jsx
import KeplerEmbed from './components/KeplerEmbed';

export default function App() {
  return (
    <div>
      <h2>Historic (pooled) — risk_label</h2>
      <KeplerEmbed src="/maps/historic.html" title="Historic Map" height="70vh" />

      <h2 style={{marginTop: 24}}>Prediction — risk_next_tier</h2>
      <KeplerEmbed src="/maps/prediction.html" title="Prediction Map" height="70vh" />
      
    </div>
  );
}