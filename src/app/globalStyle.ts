import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    overflow: hidden;
    margin: 0;
  }
`;

export default GlobalStyle;
