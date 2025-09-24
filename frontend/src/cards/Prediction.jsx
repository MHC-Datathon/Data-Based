import KeplerMap from '../components/KeplerMap.jsx';

export default function Prediction() {
  return (
    <KeplerMap
      id="prediction"
      dataUrl="/data/campus_points_with_scores.geojson"
      label="Prediction — risk_next_tier"
      centerMap={false}
    />
  );
}