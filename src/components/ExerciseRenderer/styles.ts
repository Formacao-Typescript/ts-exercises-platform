import styled from 'styled-components';

interface IProps {
  $height?: number;
}

export const Container = styled.div<IProps>`
  width: 100%;
  height: 100%;
`;
