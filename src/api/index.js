import RequestHandler from "./requestHandler";

const { fetch } = new RequestHandler({
  baseUrl: "https://rest.coinapi.io",
  headers: {
    Accept: "application/json",
    "Accept-Encoding": "deflate, gzip",
    "X-CoinAPI-Key": process.env.REACT_APP_XCOIN_API_KEY
  },
  timeout: 10000
});

export default {
  assets: {
    endpoint: "/v1/assets",
    async getAll(fields) {
      return fetch(`${this.endpoint}`);
    }
  },
  exchangerate: {
    endpoint: "/v1/exchangerate",
    async getExchangeRate(asset_id, asset_id_quote, time) {
      let params;
      if (time) {
        params = { time: new Date(Date.parse(time)).toISOString() };
      }
      return fetch(`${this.endpoint}/${asset_id}/${asset_id_quote}`, params);
    }
  }
};
