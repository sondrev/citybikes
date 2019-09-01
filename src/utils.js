const distance = require("gps-distance");

export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const getClosestNetworkId = (position, networks) => {
  networks.forEach(network => {
    network.distance = distance(position.latitude, position.longitude, network.location.latitude, network.location.longitude) * 1000;
  });

  networks.sort((a, b) => (a.distance > b.distance ? 1 : -1));

  return networks[0].id;
};

export const calculateStationDistances = (position, stations) => {
  stations.forEach(station => {
    station.distance = distance(position.latitude, position.longitude, station.latitude, station.longitude) * 1000;
  });
  stations.sort((a, b) => (a.distance > b.distance ? 1 : -1));
  return stations;
};

export const isOnAppleDevice = () => navigator.platform.indexOf("iPhone") !== -1 || navigator.platform.indexOf("iPad") !== -1 || navigator.platform.indexOf("iPod") !== -1;

export const generateGoogleMapsURL = (latitude, longitude) => {
  return `${isOnAppleDevice() ? "maps" : "https"}://maps.google.com/maps?daddr=${latitude},${longitude}&amp;ll=`;
};

export const roundUpToNearest100 = number => Math.max(0, Math.ceil(number / 100) * 100);

export const formatDistance = distance => {
  const distanceRounded = roundUpToNearest100(distance);
  return distanceRounded >= 1000 ? distanceRounded / 1000 + "km" : distanceRounded + "m";
};
