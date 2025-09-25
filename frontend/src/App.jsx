import React from "react";
import { store } from "./store";
import Graph from "./components/Graph";

import KeplerEmbed from "./components/KeplerEmbed";

export default function App() {
  return (
    <div>
      <h2>Historic (pooled) — risk_label</h2>
      <KeplerEmbed
        src="/maps/historic.html"
        title="Historic Map"
        height="70vh"
      />

      <h2 style={{ marginTop: 24 }}>Prediction — risk_next_tier</h2>
      <KeplerEmbed
        src="/maps/prediction.html"
        title="Prediction Map"
        height="70vh"
      />

      <h2 style={{ marginTop: 50, display:"flex", justifyContent: "center", alignItems: "center"}}>MTA Bus Visualizations</h2>
      <Graph
        src="/src/assets/violations_trips.png"
        alt="Violations Total Trips"
      />
      <Graph
        src="/src/assets/campus_risk_violations.png"
        alt="Campuses at Risk Based On Violation Rates and Next Violation Probabilities"
      />
      <Graph
        src="/src/assets/campus_risk.png"
        alt="Campuses at Risk with Next Violation Probabilities"
      />
      <Graph
        src="/src/assets/exposure_violation.png"
        alt="Exposure vs. Maximum Violation Rate by Burstiness (Point Size)"
        style={{width: "60%"}}
      />
      <Graph
        src="/src/assets/brooklyn.png"
        alt="Brooklyn - Trips in Buffer and Violations per 100 Trips"
      />
      <Graph
        src="/src/assets/hunter.png"
        alt="Hunter - Trips in Buffer and Violations per 100 Trips"
      />
      <Graph
        src="/src/assets/baruch.png"
        alt="Baruch - Trips in Buffer and Violations per 100 Trips"
      />
      <Graph
        src="/src/assets/ccny.png"
        alt="The City College of New York - Trips in Buffer and Violations per 100 Trips"
      />
      <Graph
        src="/src/assets/queens.png"
        alt="Queens - Trips in Buffer and Violations per 100 Trips"
      />
      <Graph
        src="/src/assets/york.png"
        alt="York - Trips in Buffer and Violations per 100 Trips"
      />
    </div>
  );
}
