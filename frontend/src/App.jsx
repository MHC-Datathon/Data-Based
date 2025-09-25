import React, { useState } from "react";
import "./App.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
   const [slide, setSlide] = useState(1);

   const nextSlide = () => {
      if (slide < 10) setSlide(slide + 1);
   };

   const prevSlide = () => {
      if (slide > 1) setSlide(slide - 1);
   };

   const stressData = {
      labels: ["Yes", "No", "I don't know"],
      datasets: [
         {
            label: "Does Your Commute Cause You Stress?",
            data: [60.8, 15.1, 24.1],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            borderColor: "#fff",
            borderWidth: 2,
         },
      ],
   };

   const improvementData = {
      labels: [
         "on-time buses",
         "Less traffic",
         "Lower costs",
         "Shorter commute time",
      ],
      datasets: [
         {
            label: "Best Ways to Improve Commute?",
            data: [21.2, 47.6, 6.1, 25.0],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            borderColor: "#fff",
            borderWidth: 2,
         },
      ],
   };

   const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
         legend: {
            position: "right",
            labels: {
               font: {
                  size: 12,
               },
               padding: 15,
               boxWidth: 12,
            },
         },
         tooltip: {
            callbacks: {
               label: function (context) {
                  return `${context.label}: ${context.parsed}%`;
               },
            },
         },
      },
      animation: { animateRotate: true, animateScale: true },
   };

   return (
      <div className={`slide slide-blue`}>
         <div className="border-box">
            {slide === 1 && (
               <>
                  <h1 className="title">MHC++ DATATHON 2025</h1>
                  <h2 className="subtitle">team: dataBASED</h2>
                  <img src="/bus.png" alt="Bus" className="bus-image" />
               </>
            )}

            {slide === 2 && (
               <div className="slide2-content">
                  <h2 className="slide-title">CUNY Student Commute Analysis</h2>
                  <p className="slide2-text">
                     Nearly two-thirds of CUNY students report feeling stressed
                     by their daily commute. Many rely on buses that are
                     frequently delayed due to traffic congestion, causing
                     frustration and lost time. One of the biggest factors that
                     contribute to this issue are bus lane violations. Ensuring
                     there aren't unpermitted vehicles using bus lanes could
                     significantly reduce stress and shorten commute times.
                  </p>

                  <div className="charts-container">
                     <div className="chart-wrapper stress-chart">
                        <h3 className="chart-title">
                           Does Commuting Cause You Stress?
                        </h3>
                        <div className="chart">
                           <Pie data={stressData} options={chartOptions} />
                        </div>
                     </div>
                     <div className="chart-wrapper improvement-chart">
                        <h3 className="chart-title">
                           Best Ways to Improve Commute?
                        </h3>
                        <div className="chart">
                           <Pie data={improvementData} options={chartOptions} />
                        </div>
                     </div>
                  </div>
                  <p className="data-source">
                     Data from:
                     https://datelinecuny.com/2018/08/nearly-two-thirds-of-cuny-students-are-stressed-from-commute/
                  </p>
               </div>
            )}

            {slide === 3 && (
               <div className="graph-slide">
                  <h2 className="slide-title">Historic Bus Lane Violations</h2>
                  <div className="kepler-container">
                     <iframe
                        src="/maps/historic.html"
                        title="Historic Map"
                        className="kepler-embed"
                     />
                  </div>
               </div>
            )}

            {slide === 4 && (
               <div className="graph-slide">
                  <h2 className="slide-title">Prediction - Risk Next Tier</h2>
                  <div className="kepler-container">
                     <iframe
                        src="/maps/prediction.html"
                        title="Prediction Map"
                        className="kepler-embed"
                     />
                  </div>
               </div>
            )}

            {slide === 5 && (
               <div className="graph-slide slide5-8">
                  <h2 className="slide-title">MTA Bus Visualizations</h2>
                  <div className="graph-content">
                     <div className="graph-left">
                        <div className="image-container">
                           <img
                              src="/src/assets/violations_trips.png"
                              alt="Violations Total Trips"
                              className="graph-image"
                           />
                        </div>
                     </div>
                     <div className="graph-right">
                        <p className="description-text">
                           This graph shows the number of violations per 100
                           trips and the total trips made within a 2 KM radius
                           for each campus. There is a moderate inverse
                           relationship shown between these variables.
                           <br />
                           <br />
                           <strong>High Usage vs. Low Violation Rate:</strong>
                           <br />
                           Some of the campuses with the highest bus trips
                           within radius (like CUNY School of Professional
                           Studies with ~1.5M trips) have low violation rates
                           (under 1 per 100 trips).
                           <br />
                           <br />
                           <strong>Low Trips, High Risk:</strong>
                           <br />
                           Some campuses with very low bus usage show high
                           violation rates. CUNY Graduate School of Public
                           Health and Policy, with minimal ridership, has ~15
                           violations per 100 trips.
                        </p>
                     </div>
                  </div>
               </div>
            )}

            {slide === 6 && (
               <div className="graph-slide slide5-8">
                  <h2 className="slide-title">Campus Risk Analysis</h2>
                  <div className="graph-content">
                     <div className="graph-left">
                        <div className="image-container">
                           <img
                              src="/src/assets/campus_risk_violations.png"
                              alt="Campuses at Risk Based On Violation Rates"
                              className="graph-image"
                           />
                        </div>
                     </div>
                     <div className="graph-right">
                        <p className="description-text">
                           Analysis of CUNY campuses most affected by bus lane
                           violations. Campuses are ranked by violation exposure
                           and risk factors, showing which institutions need
                           immediate attention for commute improvements.
                        </p>
                     </div>
                  </div>
               </div>
            )}

            {slide === 7 && (
               <div className="graph-slide slide5-8">
                  <h2 className="slide-title">
                     Campus Risk with Next Violation Probabilities
                  </h2>
                  <div className="graph-content">
                     <div className="graph-left">
                        <div className="image-container">
                           <img
                              src="/src/assets/campus_risk.png"
                              alt="Campuses at Risk with Next Violation Probabilities"
                              className="graph-image"
                           />
                        </div>
                     </div>
                     <div className="graph-right">
                        <p className="description-text">
                           Predictive analysis showing the probability of future
                           violations near CUNY campuses. This helps prioritize
                           intervention areas and allocate resources effectively
                           to reduce student commute stress.
                        </p>
                     </div>
                  </div>
               </div>
            )}

            {slide === 8 && (
               <div className="graph-slide slide5-8">
                  <h2 className="slide-title">Exposure vs. Violation Rate</h2>
                  <div className="graph-content">
                     <div className="graph-left">
                        <div className="image-container">
                           <img
                              src="/src/assets/exposure_violation.png"
                              alt="Exposure vs. Maximum Violation Rate"
                              className="graph-image wide-image"
                           />
                        </div>
                     </div>
                     <div className="graph-right">
                        <p className="description-text">
                           Correlation between student exposure to bus routes
                           and violation rates. The bubble size represents
                           burstiness: larger bubbles indicate more concentrated
                           violation patterns requiring targeted solutions.
                        </p>
                     </div>
                  </div>
               </div>
            )}

            {slide === 9 && (
               <div className="graph-slide">
                  <h2 className="slide-title">College-Specific Analysis</h2>
                  <div className="college-grid">
                     <div className="college-item">
                        <img
                           src="/src/assets/brooklyn.png"
                           alt="Brooklyn College"
                           className="college-image"
                        />
                        <p>Brooklyn College</p>
                     </div>
                     <div className="college-item">
                        <img
                           src="/src/assets/hunter.png"
                           alt="Hunter College"
                           className="college-image"
                        />
                        <p>Hunter College</p>
                     </div>
                     <div className="college-item">
                        <img
                           src="/src/assets/baruch.png"
                           alt="Baruch College"
                           className="college-image"
                        />
                        <p>Baruch College</p>
                     </div>
                     <div className="college-item">
                        <img
                           src="/src/assets/ccny.png"
                           alt="City College"
                           className="college-image"
                        />
                        <p>City College</p>
                     </div>
                     <div className="college-item">
                        <img
                           src="/src/assets/queens.png"
                           alt="Queens College"
                           className="college-image"
                        />
                        <p>Queens College</p>
                     </div>
                     <div className="college-item">
                        <img
                           src="/src/assets/york.png"
                           alt="York College"
                           className="college-image"
                        />
                        <p>York College</p>
                     </div>
                  </div>
               </div>
            )}

            {slide === 10 && (
               <div className="conclusion-slide">
                  <h1 className="title">Thank You</h1>
                  <h2 className="subtitle">MHC++ DATATHON 2025</h2>
                  <p className="conclusion-text">
                     Addressing bus lane violations can significantly improve
                     commute times and reduce stress for CUNY students across
                     all campuses.
                  </p>
               </div>
            )}
         </div>

         <button className="nav-button left" onClick={prevSlide}>
            &lt;
         </button>
         <button className="nav-button right" onClick={nextSlide}>
            &gt;
         </button>
      </div>
   );
}

export default App;
