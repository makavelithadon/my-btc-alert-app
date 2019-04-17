import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { autoCompleteStyles } from "style-utils";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box!important;
  }
  html {
    overflow-x: hidden;
  }
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Rubik', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
  }
  ul {
    padding: 0;
    margin: 0;
  }
  li {
    list-style: none;
  }
  ${({ theme }) => {
    const { background, text: color } = theme.colors;
    return autoCompleteStyles({ background, color });
  }}
`;

export default function Root({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        {children}
      </>
    </ThemeProvider>
  );
}
