// src/components/KeplerMap.jsx
import React, {useEffect, useState} from 'react';
import KeplerGl from '@kepler.gl/components';
import {useDispatch} from 'react-redux';
import {addDataToMap} from '@kepler.gl/actions';
import {processGeojson} from '@kepler.gl/processors';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function KeplerMap({
  id = 'map',
  dataUrl = '/data/campus_points_with_scores.geojson',
  label = 'Campuses',
  centerMap = true,
  height = 600
}) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // 1) Token sanity check
        if (!MAPBOX_TOKEN) {
          console.warn('VITE_MAPBOX_TOKEN missing');
          setStatus('no-token');
        }

        // 2) Fetch GeoJSON (must live under /public/data)
        const res = await fetch(dataUrl);
        if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
        const geojson = await res.json();

        if (cancelled) return;

        // 3) Dispatch to kepler
        dispatch(addDataToMap({
          datasets: {
            data: processGeojson(geojson),
            info: {label, id: `${id}-dataset`}
          },
          options: {centerMap: true, readOnly: true}
          // You can add a {config} here later if you export one from the UI
        }));

        setStatus('ready');
      } catch (e) {
        console.error('Kepler data load error:', e);
        setStatus('error');
      }
    })();

    return () => { cancelled = true; };
  }, [dataUrl, label, centerMap, id, dispatch]);

  return (
    <div style={{position: 'relative', width: '100%', height}}>
      {/* Light status ribbon so you know what’s happening */}
      {status !== 'ready' && (
        <div style={{
          position:'absolute', zIndex:10, top:8, left:8,
          background:'#0009', color:'#fff', padding:'4px 8px',
          borderRadius:4, fontSize:12
        }}>
          {status === 'loading' && 'Loading…'}
          {status === 'no-token' && 'Mapbox token missing'}
          {status === 'error' && 'Failed to load data'}
        </div>
      )}

      <KeplerGl
        id={id}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        width={window.innerWidth}   // simple sizing; good enough for now
        height={height}
      />
    </div>
  );
}