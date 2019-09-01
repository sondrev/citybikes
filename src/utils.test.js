import * as utils from "./utils.js";

const bergen = {
  id: "bergen",
  location: {
    latitude: 60.39299,
    longitude: 5.32415
  }
};

const stavanger = {
  id: "stavanger",
  location: {
    latitude: 58.97005,
    longitude: 5.73332
  }
};

const haugesund = {
  id: "haugesund",
  location: {
    latitude: 59.41378,
    longitude: 5.268
  }
};

const hongKong = {
  id: "hong kong",
  location: {
    latitude: 22.28552,
    longitude: 114.15769
  }
};

test("that getClosestNetworkId returns closest", () => {
  const closest = utils.getClosestNetworkId(bergen.location, [stavanger, haugesund, hongKong]);
  expect(closest).toBe("haugesund");
});

test("that distances are formatted correctly", () => {
  expect(utils.formatDistance(0)).toBe("0m");
  expect(utils.formatDistance(0.0)).toBe("0m");
  expect(utils.formatDistance(-99990)).toBe("0m");
  expect(utils.formatDistance(197.6)).toBe("200m");
  expect(utils.formatDistance(999.6)).toBe("1km");
  expect(utils.formatDistance(1299.6)).toBe("1.3km");
});
