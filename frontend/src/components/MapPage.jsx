import React, { useEffect } from "react";
import KeplerGl from "kepler.gl";
import { useDispatch } from "react-redux";
import {
  addDataToMap,
  processCsvData,
  processGeojson,
} from "kepler.gl/actions";

// simple helper: quantile cuts
function quantile(values, q) {
  const v = values
    .slice()
    .filter(Number.isFinite)
    .sort((a, b) => a - b);
  if (!v.length) return NaN;
  const pos = (v.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  return v[base] + (v[base + 1] - v[base]) * rest || v[base];
}

export default function MapPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadAndAdd() {
      // 1) fetch both files
      const [gjText, csvText] = await Promise.all([
        fetch("/data/campus_points.geojson").then((r) => r.text()),
        fetch("/data/campus_pooled.csv").then((r) => r.text()),
      ]);

      // 2) parse
      const gj = JSON.parse(gjText);
      const pool = processCsvData(csvText); // pool.rows + pool.fields

      // 3) index pooled CSV by campus (lowercased)
      const byCampus = new Map(
        pool.rows.map((r) => [String(r.campus).trim().toLowerCase(), r])
      );

      // 4) OPTIONAL: derive tier from pooled rate if not present
      const rates = pool.rows
        .map((r) => Number(r.viol_per_100_trips_pooled))
        .filter(Number.isFinite);

      const hiCut = quantile(rates, 0.75);
      const medCut = quantile(rates, 0.5);

      const tierOf = (rate) => {
        if (!Number.isFinite(rate)) return "low";
        return rate >= hiCut ? "high" : rate >= medCut ? "medium" : "low";
      };
      // 5) merge CSV attributes into GeoJSON properties
      gj.features.forEach((f) => {
        const campus = String(f.properties.campus || "")
          .trim()
          .toLowerCase();
        const row = byCampus.get(campus);
        if (row) {
          // attach all CSV columns
          Object.entries(row).forEach(([k, v]) => {
            f.properties[k] = v;
          });

          // ensure we have a tier to style on
          if (
            !f.properties.risk_next_tier &&
            f.properties.viol_per_100_trips_pooled != null
          ) {
            const r = Number(f.properties.viol_per_100_trips_pooled);
            f.properties.risk_next_tier = tierOf(r);
          }
        } else {
          // in case of a naming mismatch: still add safe defaults
          f.properties.viol_per_100_trips_pooled = null;
          f.properties.violations = null;
          f.properties.trips = null;
          f.properties.risk_next_tier = "low";
        }
      });
      // 6) kepler dataset + config
      const dataset = {
        info: { label: "CUNY Campuses (pooled)", id: "campus-pooled" },
        data: processGeojson(gj),
      };

      // basic layer + color-by-tier config
      const config = {
        visState: {
          filters: [],
          layers: [
            {
              id: "campus_points",
              type: "point",
              config: {
                dataId: "campus-pooled",
                label: "Campuses",
                color: [18, 147, 154],
                columns: { lat: "POINT_LAT", lng: "POINT_LNG", altitude: null },
                isVisible: true,
                visConfig: {
                  // size using pooled rate (fallback to 10 if null)
                  radius: 10,
                  radiusRange: [6, 36],
                },
              },
              visualChannels: {
                sizeField: { name: "viol_per_100_trips_pooled", type: "real" },
                sizeScale: "sqrt",
                colorField: { name: "risk_next_tier", type: "string" },
                colorScale: "ordinal",
              },
            },
          ],
          interactionConfig: {
            tooltip: {
              fieldsToShow: {
                "campus-pooled": [
                  { name: "campus", format: null },
                  { name: "viol_per_100_trips_pooled", format: ".2f" },
                  { name: "violations", format: null },
                  { name: "trips", format: null },
                  { name: "risk_next_tier", format: null },
                ],
              },
              enabled: true,
            },
          },
        },
        mapState: { latitude: 40.73, longitude: -73.97, zoom: 10 },
        mapStyle: { styleType: "light" },
      };
      // 7) dispatch to kepler
      dispatch(
        addDataToMap({
          datasets: [dataset],
          options: {
            centerMap: true,
            keepExistingConfig: false,
          },
          config,
        })
      );
    }

    loadAndAdd();
  }, [dispatch]);

  return (
    <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0 }}>
      <KeplerGl
        id="cuny-map"
        width={window.innerWidth}
        height={window.innerHeight}
        mapboxApiAccessToken={
          import.meta.env.VITE_MAPBOX_TOKEN ||
          process.env.REACT_APP_MAPBOX_TOKEN
        }
      />
    </div>
  );
}
