import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import './normalize.css';
import './themes.scss';

const GlobalStyles = createGlobalStyle`
  :root {
    font-family: 'Roboto', system-ui, sans-serif;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: var(--text-active-primary);
    background: var(--base-active);
  }

  html {
    font-size: 16px;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }


  body, input, button {
    font-size: 1rem;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,.2);
    border-radius: 5px;
  }

  ::-webkit-scrollbar {
      width: 6px !important;
      height: 6px !important;
  }

  ::-webkit-scrollbar-track {
      background: hsla(0,0%,100%,.1);
  }

  .hidden {
    display: none;
    visibility: hidden;
  }
`;

export default GlobalStyles;
