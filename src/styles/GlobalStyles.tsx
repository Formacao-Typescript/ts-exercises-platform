import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import './normalize.css';
// import './themes.scss';

const GlobalStyles = createGlobalStyle`
  :root {
    font-family: 'Roboto', system-ui, sans-serif;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: var(--text-active-primary);
    background: var(--base-active);

    // Toastify theme variables: https://fkhadra.github.io/react-toastify/how-to-style
    --toastify-color-dark: #1e2638; 

  // FIXME: Figure out branding colors and CSS variables management later on
  /* gradients */
  --trade-expert-gradient: linear-gradient(45deg, var(--accent-orange), var(--accent-red));
  --trade-intermediate-gradient: linear-gradient(45deg, var(--accent-pink), var(--accent-dark-purple));
  --trade-essential-gradient: linear-gradient(45deg, var(--accent-teal), var(--accent-blue));
  
  /* LSantos branding */
  --branding-green: #45bb8b;
  --branding-blue: #197bc0;
  --branding-red: #ed1c24;
  --branding-yellow: #f6b21a;
  
  /* backgrounds */
  --background: #000020;
  --bg-dark-purple: #0a0020;
  --bg-mid-purple: #100523;
  --bg-purple: #180b2d;
  --bg-black: #000016;
  --background-gradient: linear-gradient(135deg, var(--bg-black) 80%, var(--accent-dark-blue));
  /* other */
  --accent-dark-blue: #006dfb;
  --accent-teal: #00adca;
  --accent-blue: #0066ff;
  --accent-dark-purple: #6002fc;
  --accent-pink: #bb03c9;
  --accent-orange: #f85400;
  --accent-redish: #dd2900;
  --accent-red: #c80000;
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
