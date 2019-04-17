import { css } from "styled-components";
import theme from "theme";
import { flat } from "utils";

const {
  breakpoints: { values: breakpoints, order: breakpointsOrder }
} = theme;

export const forEach = (obj, cb) =>
  flat(
    Object.entries(obj).reduce(
      (acc, [breakpoint, value]) => [
        ...acc,
        media[breakpoint]`${cb(value, breakpoint)}`
      ],
      []
    )
  );

export const getHigherFromBreakpoints = obj => {
  for (const br of [...breakpointsOrder].reverse()) {
    if (obj[br]) {
      return obj[br];
    }
  }
};

const initial = { forEach, getHigherFromBreakpoints };

export const media = Object.entries(breakpoints).reduce(
  (acc, [name, width]) => {
    acc[name] = (...args) => css`
      @media (min-width: ${width}) {
        ${css(...args)}
      }
    `;

    return acc;
  },
  initial
);

export function truncate(width) {
  return `
    width: ${width};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
}

export function fillSizes(position = "absolute") {
  return `
    position: ${position};
    top: 0; right: 0; bottom: 0; left: 0;
    width: 100%; height: 100%;
  `;
}

export function center(position = "both") {
  let styles;
  switch (position) {
    case "vertical":
      styles = `
        top: 50%;
        transform: translateY(-50%);
      `;
      break;
    case "horizontal":
      styles = `
        left: 50%;
        transform: translateX(-50%);
        `;
      break;
    case "both":
      styles = `
        left: 50%; top: 50%;
        transform: translate(-50%, -50%);
      `;
      break;
    default:
      styles = ``;
      break;
  }
  return `
    position: absolute;
    ${styles}
  `;
}

export function clearfix() {
  return `
    *zoom: 1;
    &:before, &:after {
      content: " ";
      display: table;
    }
    &:after {
      clear: both;
    }
  `;
}

export function hardwareAcceleration({ x = 0, y = 0, z = 0 } = {}) {
  return `
    transform: translate3d(${x}, ${y}, ${z});
    backface-visibility: hidden;
    perspective: 1000;
  `;
}

export function backgroundCover(
  url,
  { position = "center center", attachment = "initial" } = {}
) {
  return `
    background: url(${url});
    background-repeat no-repeat;
    background-position: ${position};
    background-attachment: ${attachment};
    background-size: cover;
  `;
}

export function inheritComponent(component, props, rules = ``) {
  return css`
    ${component.componentStyle.rules.reduce((acc, rule) => {
      return acc + (typeof rule === "function" ? rule(props) : rule);
    }, ``) + rules}
  `;
}

export function fixedVh(n) {
  /* Fallback for browsers that do not support Custom Properties */
  const fallback = `${n}vh`;
  const computed = /* `calc(var(--vh, ${n}vh) * 100)` */ fallback;
  return [fallback, computed];
}

export function autoCompleteStyles(
  { background, color } = { background: "#fff", color: "#000" }
) {
  return css`
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus,
    input:-internal-autofill-previewed,
    input:-internal-autofill-selected,
    textarea:-internal-autofill-previewed,
    textarea:-internal-autofill-selected,
    select:-internal-autofill-previewed,
    select:-internal-autofill-selected {
      box-shadow: 0 0 0px 1000px ${background} inset;
      -webkit-box-shadow: 0 0 0px 1000px ${background} inset;
      color: ${color} !important;
      -webkit-text-fill-color: ${color} !important;
    }
  `;
}
