const APIBaseUrl = "http://api.citybik.es/v2/networks";

const api = {
  async getAllNetworks() {
    try {
      const response = await fetch(`${APIBaseUrl}`);
      const data = await response.json();
      return data.networks;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  async getNetwork(networkId) {
    try {
      const response = await fetch(`${APIBaseUrl}/${networkId}`);
      const data = await response.json();
      return data.network;
    } catch (error) {
      console.error(error);
      return {};
    }
  }
};

export default api;
