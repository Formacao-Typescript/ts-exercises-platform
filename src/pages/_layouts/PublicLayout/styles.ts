import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: green;

  > header {
    height: 80px;
  }

  > main {
    display: flex;
    height: 100%;
  }

  > footer {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 8px 16px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  background: var(--primary-200);
`;
