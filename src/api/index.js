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
  }
};
