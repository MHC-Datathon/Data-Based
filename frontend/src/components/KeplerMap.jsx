import React, {useEffect} from 'react';
import KeplerGl from '@kepler.gl/components';
import {useDispatch} from 'react-redux';
import {addDataToMap} from '@kepler.gl/actions';
import {processGeojson} from '@kepler.gl/processors';

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function KeplerMap({id, dataUrl, label='Campuses', config, centerMap=true, height=600}) {
  const dispatch = useDispatch();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(dataUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status} ${dataUrl}`);
        const geo = await res.json();

        const dataset = {
          data: processGeojson(geo),
          info: {id: `${id}-dataset`, label}
        };

        if (alive) {
          dispatch(addDataToMap({datasets: dataset, options: {centerMap}, config}));
          console.log(`Loaded ${label}`, dataset.data.rows.length, 'rows');
        }
      } catch (e) {
        console.error('Failed to load dataset:', e);
      }
    })();
    return () => { alive = false; };
  }, [id, dataUrl, label, config, centerMap, dispatch]);

  return (
    <div style={{height}}>
      <KeplerGl
        id={id}
        mapboxApiAccessToken={TOKEN}
        width={window.innerWidth}
        height={height}
      />
    </div>
  );
}