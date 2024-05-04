import styled from 'styled-components';

export const Container = styled.div`
  /*
  FIXME: This code is a port from the fts-lead-page project (in Astro), since we're in React now
  the implementation can be improved by getting rid of the data props (data-scale). 
  I'm leaving some notes for future reference:
  ---
  Notes: any size is valid keeping the proportion "N rem/N px" for font-size/border-size.
  To implement this the CSS works, but the JS doesn't for some reason
  js:
    const logo = document.querySelector('.logo');
    const scale = logo.dataset.scale || '4';
    logo.style.setProperty('--scale', scale);
  css:
    .logo {
      // --scale: 4;
      font-size: calc(1rem * var(--scale, 1));
      .logo-background {
        padding: calc(1px * var(--scale, 1));
      }
  }
  */
  .logo[data-scale='4x'] {
    font-size: 4rem;
    .logo-background {
      padding: 4px;
    }
  }
  .logo[data-scale='2x'] {
    font-size: 2rem;
    .logo-background {
      padding: 2px;
    }
  }
  &.logo {
    --logo-background: #0b0b20;
    --background-gradient: linear-gradient(to bottom, #04a9cc, #0164fd);
    --slash-gradient: linear-gradient(to top, #00aac9, #008ce7);
    --ts-gradient: linear-gradient(to bottom, #00aac9 30%, #006bfd);
    display: inline-block;
    font-size: 4rem;

    &-background {
      background: var(--background-gradient);
      border-radius: 0.375em;
      padding: 4px;
    }

    &-content {
      border-radius: 0.375em;
      background: var(--logo-background);
      color: white;
      font-family: 'Red Hat Display', sans-serif;
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
      padding: 0 24px;

      &-slashes {
        background: var(--slash-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: bold;
        overflow: show;
        padding-left: 6px;
        letter-spacing: 0.1rem;
      }

      &-text {
        text-transform: lowercase;
        font-weight: bold;
        letter-spacing: 0.3rem;
      }

      &-ts {
        text-transform: uppercase;
        background: var(--ts-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 900;
      }
    }
  }
`;
