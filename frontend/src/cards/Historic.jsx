import KeplerMap from '../components/KeplerMap.jsx';

export default function Historic() {
  return (
    <KeplerMap
      id="historic"
      dataUrl="/data/campus_points_with_scores.geojson"
      label="Historic (pooled) — risk_label"
      centerMap={true}
    />
  );
}