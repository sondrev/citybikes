import React from "react";
import api from "../api";
import StationList from "./StationList";
import { getCurrentPosition, getClosestNetworkId, calculateStationDistances } from "../utils";

const Footer = () => (
  <footer className="text-centered">
    <p>2019</p>
    <p>
      Data from <a href="http://api.citybik.es/v2/">api.citybik.es</a>
    </p>
    <p>
      Icons from <a href="http://fontawesome.com">fontawesome.com</a>
    </p>
  </footer>
);

class Main extends React.Component {
  state = {
    stations: [],
    locationName: undefined,
    serviceName: undefined,
    userPosition: undefined,
    networkId: undefined
  };

  updateUserPositionAndStations = async () => {
    const position = await getCurrentPosition();
    const networkId = this.state.networkId || (await api.getAllNetworks().then(networks => Promise.resolve(getClosestNetworkId(position.coords, networks))));
    const network = await api.getNetwork(networkId);

    this.setState({
      userPosition: position.coords,
      stations: calculateStationDistances(position.coords, network.stations),
      locationName: network.location.city,
      serviceName: network.name,
      networkId
    });
  };

  componentDidMount() {
    setInterval(this.updateUserPositionAndStations, 30 * 1000);
    this.updateUserPositionAndStations();
  }

  render() {
    return (
      <>
        <h1 className="text-centered">Citybikes</h1>
        {this.state.userPosition && this.state.serviceName ? (
          <>
            <h3 className="text-centered">
              Your closest Citybike provider is {this.state.serviceName} in {this.state.locationName}
            </h3>
            <StationList stations={this.state.stations} />
          </>
        ) : (
          <h3 className="text-centered">Waiting for your gps location and bike data</h3>
        )}

        <Footer />
      </>
    );
  }
}

export default Main;
