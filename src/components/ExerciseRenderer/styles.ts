import styled from 'styled-components';

interface IProps {
  $height?: number;
}

export const Container = styled.div<IProps>`
  @property --angle {
    syntax: '<angle>';
    initial-value: 90deg;
    inherits: true;
  }

  --d: 2500ms;
  --angle: 90deg;
  --gradX: 100%;
  --gradY: 50%;
  --c1: rgba(168, 239, 255, 1);
  --c2: rgba(168, 239, 255, 0.1);
  @keyframes borderRotate {
    100% {
      --angle: 420deg;
    }
  }

  width: 100%;
  padding: 3vw;
  border: 0.35rem solid;
  border-image: conic-gradient(
      from var(--angle),
      var(--c2),
      var(--c1) 0.1turn,
      var(--c1) 0.15turn,
      var(--c2) 0.25turn
    )
    30;
  animation: borderRotate var(--d) linear infinite forwards;
`;
