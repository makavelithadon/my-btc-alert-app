// true colors

const white = "#fff";
const black = "#383838";
const red = "#df4343";
const orange = "orangered";
const lightGrey = "#989898";
const lightenGrey = "#d6d6d6";
const lightGreen = "#73f587";
const green = "#4ccc58";
const lightPurple = "#ea7dfb";
const blueGrey = "#4b537b";
const darkBlueGrey = "#313651";
const lightWhite = "#f6f6f6";
const lightBlue = "#5078F2";

// app colors

const success = green;
const danger = red;
const warning = orange;

const base = {
  white,
  black,
  lightGrey,
  lightGreen,
  lightPurple,
  lightBlue,
  lightenGrey,
  darkBlueGrey,
  success,
  danger,
  warning
};

const light = {
  ...base,
  primary: lightBlue,
  secondary: blueGrey,
  background: lightWhite,
  reverseBackground: darkBlueGrey,
  text: black,
  reverseText: lightWhite
};

const dark = {
  ...base,
  primary: blueGrey,
  secondary: lightBlue,
  background: darkBlueGrey,
  reverseBackground: lightWhite,
  text: white,
  reverseText: black
};

export default {
  light,
  dark
};
