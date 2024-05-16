import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 100px;

  span.divider {
    display: block;
    width: 100%;
    height: 1px;
    background-color: #e5e7eb;
    margin: 1rem 0;
  }
`;

export const HeroBanner = styled.div`
  width: 475px;

  h1 {
    font-size: 64px;
    line-height: 1.2;
    margin-bottom: 0;
  }

  p {
    font-size: 24px;
    margin-top: 10px;
    margin-bottom: 40px;
    font-weight: 300;
    color: var(--trade-light-gray);

    strong,
    b {
      color: white;
    }

    b {
      font-weight: bold;
    }
  }

  li {
    padding: 25px 20px;
    border-left: 2px solid var(--trade-light-blue);
    margin-bottom: 10px;
    background: var(--trade-gray);
    border-radius: 8px;
    opacity: 0.9;
  }

  @media (max-width: 1024px) {
    width: 100%;
    margin-top: 40px;
    text-align: center;
  }
`;

export const CTABanner = styled.div`
  max-width: 425px;
  padding: 40px;
  margin-bottom: 14px;
  font-size: 18px;
  opacity: 0.9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    font-size: 14px;
    color: #898989;
  }

  button {
    width: 100%;
    margin-top: 40px;
    padding: 20px 32px;
    text-transform: uppercase;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #7263d7, #444dca);
    border-radius: 8px;
    font-size: 14px;

    &:hover {
      background: #444dca;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 5%;
    max-width: 100%;
    align-items: center;

    p {
      width: 55%;
      margin-right: 5%;
      text-align: center;
    }
    button {
      width: 40%;
      margin-top: 0px;
      padding: 6px 10px;
      border-radius: 8px;
    }
  }
`;
