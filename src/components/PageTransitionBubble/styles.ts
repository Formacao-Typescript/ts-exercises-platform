import styled from 'styled-components';

export const Container = styled.span`
  @keyframes bubble-animation {
    0%,
    100% {
    }
    60% {
      width: 300vw;
      height: 300vh;
      transform: translate(-50%, -50%);
      border-radius: 12px;
    }
  }

  top: 368px;
  left: 180px;
  visibility: hidden;

  &.animate-bubble {
    visibility: visible;
    animation: bubble-animation 1.5s ease-in-out forwards;
    /* transition: all 1s ease-in-out; */
  }
`;
