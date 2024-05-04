import styled from 'styled-components';

export const Container = styled.div`
  --tiled-background-color-1: rgb(98, 0, 234);
  --tiled-background-color-2: rgb(236, 64, 122);
  @keyframes background-pan {
    from {
      background-position: 0% center;
    }
    to {
      background-position: -200% center;
    }
  }

  .tiled-background {
    position: fixed;
    /* background: pink; */
    width: 100%;
    height: 100%;

    animation: background-pan 10s linear infinite;
    background: linear-gradient(
      to right,
      var(--tiled-background-color-1),
      var(--tiled-background-color-2),
      var(--tiled-background-color-1)
    );
    background-size: 200%;
    overflow: hidden;
  }

  #tiles {
    height: 100%;
    width: 100%;
    display: grid;
    /* grid-template-columns: repeat(var(--columns), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr); */
    pointer-events: all;
    z-index: 1900;
  }

  .tile {
    position: relative;
    z-index: 1;
  }
  .tile::before {
    background-color: rgb(20, 20, 20);
    content: '';
    position: absolute;
    inset: 0.5px;
  }

  #cursor {
    position: fixed;
    width: 500px;
    height: 500px;
    background: radial-gradient(lime, transparent, transparent);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    visibility: visible;

    @media (max-width: 768px) {
      visibility: hidden !important;
    }
  }
`;
