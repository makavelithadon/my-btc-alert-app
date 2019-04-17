import { delay } from "utils";

const mockDelay = false;

const defaultOptions = {
  timeout: 20000
};

export default class Fetch {
  constructor({ baseUrl, timeout = defaultOptions.timeout, ...options }) {
    this._endpoint = baseUrl;
    this._options = { ...options, timeout };
  }
  fetch = async (...options) => {
    const [url, opts] = options;
    const normalizedOptions = this.normalizeOptions(url, opts);
    const request = window.fetch(this._endpoint + url, normalizedOptions);
    const hasTimeout = typeof normalizedOptions.timeout !== "undefined";
    mockDelay && (await delay(3000));
    const response = await (hasTimeout
      ? this.timeout(normalizedOptions.timeout, request)
      : request);
    return await this.handleResponse(response);
  };
  handleResponse = async response => {
    if (!response.ok) {
      const error = new Error(response.statusText);
      const responseObject = await response.json();
      if (!responseObject.message)
        responseObject.message =
          "Une erreur serveur est survenue. Merci de réessayer ultérieurement.";
      error.response = responseObject;
      throw error;
    }
    const responseMethod = response.status === 204 ? "text" : "json";
    return await response[responseMethod]();
  };
  normalizeOptions = (...options) => {
    const mergedOptions = {
      ...this._options,
      ...(options[1] ? options[1] : {})
    };
    return mergedOptions;
  };
  timeout = (timeout, request) => {
    return Promise.race([
      request,
      new Promise((_, reject) =>
        window.setTimeout(
          () =>
            reject({
              response: {
                code: 408,
                message: `Le serveur n'a pas répondu dans le temps imparti (${timeout /
                  1000} sec)`
              }
            }),
          timeout
        )
      )
    ]);
  };
}
