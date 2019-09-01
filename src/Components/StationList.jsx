import React from "react";
import Station from "./Station";

class App extends React.Component {
  state = {
    expandedStation: undefined,
    userWantToReturnBike: false
  };

  expandStation = expandedStation => {
    if (expandedStation === this.state.expandedStation) {
      this.setState({ expandedStation: undefined });
    } else {
      this.setState({ expandedStation });
    }
  };

  stationIsNotEmpty = station => {
    // empty - a station have no empty slots left, or there are no bikes left - depending on what the user want to do
    if (this.state.userWantToReturnBike) {
      return station.empty_slots > 0;
    } else {
      return station.free_bikes > 0;
    }
  };

  stationIsAlmostEmpty = station => {
    const criticalLevel = 2;

    if (this.state.userWantToReturnBike) {
      return station.empty_slots <= criticalLevel;
    } else {
      return station.free_bikes <= criticalLevel;
    }
  };

  setFilter = (e, userWantToReturnBike) => {
    e.preventDefault();
    this.setState({ userWantToReturnBike });
  };

  render() {
    return (
      <div className="station-list">
        <div className="station-list--filter-selector">
          <button className={this.state.userWantToReturnBike ? "" : "selected"} onClick={e => this.setFilter(e, false)}>
            I want to find a free bike
          </button>
          <button className={this.state.userWantToReturnBike ? "selected " : ""} onClick={e => this.setFilter(e, true)}>
            I want to return a bike
          </button>
        </div>
        <h2>Stations nearby</h2>
        {this.props.stations.filter(this.stationIsNotEmpty).map(station => (
          <Station key={station.id} data={station} isExpanded={this.state.expandedStation === station.id} expandStation={this.expandStation} isCritical={this.stationIsAlmostEmpty(station)} />
        ))}
      </div>
    );
  }
}

export default App;
