import styled from 'styled-components';

export const Container = styled.div`
  --logo-background: #0b0b20;
  --background-gradient: linear-gradient(to bottom, #04a9cc, #0164fd);
  --slash-gradient: linear-gradient(to top, #00aac9, #008ce7);
  --ts-gradient: linear-gradient(to bottom, #00aac9 30%, #006bfd);

  --z-index-0: 40;
  --z-index-1: 41;
  --z-index-2: 42;

  --logo-size: 3;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    25% {
      border-radius: 20% 80% 30% 90%;
    }
    50% {
      border-radius: 60% 90% 80% 80%;
    }
    100% {
      transform: rotate(360deg);
    }
  }

  position: fixed;
  top: 0;
  display: none;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100svh;
  background: #0b0b20;
  z-index: var(--z-index-0);

  .fts-loading {
    &-changing-background {
      padding: 20px;
      background: var(--background-gradient);
      position: fixed;
      width: 150px;
      height: 150px;
      z-index: var(--z-index-1);
      border-radius: 60% 50% 70% 60%;
      animation: spin 2s linear infinite;
    }
  }

  .logo {
    position: fixed;
    display: inline-block;
    font-size: calc(var(--logo-size) * 1rem); // 4rem;
    z-index: var(--z-index-2);

    &-background {
      background: var(--background-gradient);
      border-radius: 0.375em;
      padding: calc(var(--logo-size) * 1px); // 4px;
      padding: 0;
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
        display: none;
        opacity: 0;
        width: 0;
      }

      &-text {
        text-transform: lowercase;
        font-weight: bold;
        letter-spacing: 0.3rem;
        opacity: 0;
        display: none;
        width: 0;
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
