import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import keplerGlReducer, { enhanceReduxMiddleware } from "@kepler.gl/reducers";
import KeplerGl from "kepler.gl";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { connect, Provider } from "react-redux";
import './App.css'

const token = import.meta.env.VITE_MAPBOX_TOKEN;

function App() {
  return (
    <div style={{width:"100%", height:"100%"}}>
    <AutoSizer>
      <KeplerGl
      mapboxApiAccessToken={token}
      id="map"
      width={width}
      height={height}
      >
      </KeplerGl>
    </AutoSizer>
    </div>
  )
}

export default App
