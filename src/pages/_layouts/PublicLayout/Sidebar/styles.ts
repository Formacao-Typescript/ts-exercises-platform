import styled from 'styled-components';

export const Container = styled.aside`
  --width: 350px;
  width: var(--width);

  > header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 8px;
    margin-bottom: 8px;
    position: relative;

    &::after {
      content: '';
      width: 80%;
      margin-left: 10%;
      height: 2px;
      border-radius: 50%;
      background: linear-gradient(
        to right,
        var(--primary-600),
        var(--secondary-600)
      );
      position: absolute;
      bottom: 0;
    }

    h2 {
      width: calc(var(--width) - 50px);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;
