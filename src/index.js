import React from "react";
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";


import "./styles.css";

const DASHBOARD_URL =
  "https://wlyy2owh8i.execute-api.eu-west-1.amazonaws.com/dashboard/d733b0b2-f429-4bdf-82ab-c9fc3b3190d7";


function App() {
  const [loading, setLoading] = useState(true)
  const [dashboard, setDashboard] = useState({})

  async function refreshData() {
    const resp = await fetch(DASHBOARD_URL, {
      method: "GET",
      mode: "cors"
    });
    setDashboard(await resp.json())
    setLoading(false)
    setTimeout(refreshData, 10 * 1000);
  }

  useEffect(() => {
    refreshData()
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>{dashboard.name}</h1>
      {dashboard.widgets.map((widget) => (
        <details open key={widget.id}>
          <summary>{widget.name}</summary>
          <div className="infoPanel">
            {widget.realtimeInfo.map((info) => (
              <div
                className="infoItem"
                key={`${info.arrivingInMinutes}-${info.destination}`}
              >
                <span className="arrivingInMinutes">
                  {info.arrivingInMinutes}m
                </span>{" "}
                <span className="destination">{info.destination}</span>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement)
root.render(<App />);

