import styled from 'styled-components';

interface IProps {
  $height?: number;
}

export const Container = styled.div<IProps>`
  width: 100%;
  margin: 16px 0;
`;
