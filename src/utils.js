import flatten from "array.prototype.flat";
import hexRgb from "hex-rgb";
import validator from "validator";
import uuid from "uuid";

export const isDev = Boolean(process.env.NODE_ENV === "development");

export function keepOnlyNotUndefinedValues(arr) {
  return arr.filter(x => typeof x !== "undefined");
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const contains = (searchIn, search) => {
  if (typeof searchIn === "string") {
    return searchIn.includes(search);
  } else if (Array.isArray(searchIn)) {
    return searchIn.reduce((bool, item) => item.includes(search), false);
  }
};

export function flat(...args) {
  return flatten(...args);
}

export function getCSSProperty(el, prop) {
  return window.getComputedStyle(el).getPropertyValue(prop);
}

export function hexToRgb(...args) {
  return hexRgb(...args);
}

export function splitUrlToGenerateKeysTransitionsSourceOfTruth(url, index) {
  /*
    '/app/lists/:listId/' => will cut '/' caracters and take the right index from url string

    'app' for index 0 | 'lists' for index 1 and so on...

  */
  return url.split("/").filter(a => a)[index];
}

export function isEmail(str) {
  return validator.isEmail(str);
}

export function split(url, truthies = false) {
  const splitted = url.split("/");
  return truthies ? splitted.filter(a => a) : splitted;
}

export function sortBy(func) {
  return function(a, b) {
    return func(a, b);
  };
}

export const getUniqID = () => uuid.v4();
