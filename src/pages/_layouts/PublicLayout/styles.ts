import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  > main {
    display: flex;
    min-height: calc(100% - 100px);
    /* height: 100%; */
  }
`;

export const Content = styled.div``;
