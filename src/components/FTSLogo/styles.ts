import styled, { css } from 'styled-components';

interface Props {
  scale: number;
}
export const Container = styled.div<Props>`
  ${({ scale }) => css`
    font-size: ${scale}rem;
    .logo-background {
      padding: ${scale}px;
    }
  `}

  --logo-background: #0b0b20; // #191E25
  --background-gradient: linear-gradient(to bottom, #04a9cc, #0164fd);
  --slash-gradient: linear-gradient(to top, #00aac9, #008ce7);
  --ts-gradient: linear-gradient(to bottom, #00aac9 30%, #006bfd);
  display: inline-block;
  /* font-size: 4rem; */

  .logo {
    &-background {
      background: var(--background-gradient);
      border-radius: 0.375em;
      /* padding: 4px; */
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
        font-weight: 900;
        overflow: show;
        padding-left: 6px;
        letter-spacing: 0.1rem;
        margin-left: -8px;
      }

      &-text {
        text-transform: lowercase;
        font-weight: bold;
        letter-spacing: 0.15rem;
        margin: 0 5px;
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
