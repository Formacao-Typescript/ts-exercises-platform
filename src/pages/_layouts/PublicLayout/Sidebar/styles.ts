import styled from 'styled-components';

export const Container = styled.aside`
  --width: 350px;
  width: var(--width);
  height: 100%;

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

  .navigation-list {
    list-style: none;
    height: 70%;
    overflow: auto;

    &-info {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;

      border-bottom: 1px solid var(--gray-300);
      box-shadow: 4px 4px 13px -7px var(--gray-300);

      svg {
        margin-right: 8px;
      }
    }
  }
  .activity-list {
    cursor: pointer;
    list-style: none;
    &-item {
      padding: 8px;
      border-bottom: 1px solid var(--gray-300);
    }
  }
`;
