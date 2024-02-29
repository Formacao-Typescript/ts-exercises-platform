import styled from 'styled-components';

interface IProps {
  $height?: number;
}

export const Container = styled.div<IProps>`
  /* @property --angle {
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
  animation: borderRotate var(--d) linear infinite forwards; */

  --foreground-color: #44475a;
  --accent-color: #8be9fd;
  --accent-color-2: #66e8f9;
  --background-color: #282a36;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  width: 100%;
  padding: 4px;
  border-radius: 12px;
  background: linear-gradient(-45deg, #0164fe, #b902c6, #5e00ff, #fc5900);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;

  /* padding: 4px; */
  .editor {
    width: 100%;
    background: var(--background-color);
    position: relative;

    height: calc(100% - 40px);
    margin-top: 40px;
    border-radius: 0 12px 12px 12px;
    padding: 16px;

    &-title {
      position: absolute;
      top: -40px;
      left: 0;

      background: var(--foreground-color);
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      border-radius: 12px 12px 0 0;

      span,
      svg {
        margin-left: 8px;
      }
    }

    &-content {
      h1 {
        font-size: 1.75rem;
        line-height: 2.5rem;
        margin-bottom: 1rem;

        &:before {
          content: '# ';
          color: #c0c0c0;
        }
      }
      p {
        font-size: 1.05rem;
      }
      code {
        background: var(--accent-color-2);
        color: var(--foreground-color); //#424660;
        padding: 4px;
        border-radius: 4px;

        &:before {
          content: '// ';
          color: #45afbd;
          font-size: 1.2rem;
        }

        &:after {
          content: ' //';
          color: #45afbd;
          font-size: 1.2rem;
        }
      }
      em {
        font-style: italic;
        background: rgba(0, 0, 0, 0.1);
        text-decoration: underline;
      }
      strong {
        background: var(--foreground-color);

        padding: 4px;
        border-radius: 4px;
      }
    }
  }
`;
