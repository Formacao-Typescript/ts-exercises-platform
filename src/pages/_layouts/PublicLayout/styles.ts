import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */

  > main {
    display: flex;
    min-height: calc(100vh - 100px);
    height: auto;
    /* overflow: auto; */
  }
`;
