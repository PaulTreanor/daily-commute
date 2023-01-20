import React from "react";
import ReactDOM from "react-dom/client";


import "./styles.css";

const DASHBOARD_URL =
  "https://wlyy2owh8i.execute-api.eu-west-1.amazonaws.com/dashboard/d733b0b2-f429-4bdf-82ab-c9fc3b3190d7";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dashboard: {}
    };
    this.refreshData = this._refreshData.bind(this);
  }

  async _refreshData() {
    const resp = await fetch(DASHBOARD_URL, {
      method: "GET",
      mode: "cors"
    });
    const dashboard = await resp.json();
    this.setState({
      loading: false,
      dashboard
    });
    setTimeout(this.refreshData, 10 * 1000);
  }

  async componentDidMount() {
    this.refreshData();
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    const d = this.state.dashboard;

    return (
      <div className="App">
        <h1>{d.name}</h1>
        {d.widgets.map((widget) => (
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
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement)
root.render(<App />);

