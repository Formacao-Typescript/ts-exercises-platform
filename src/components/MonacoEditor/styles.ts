import styled from 'styled-components';

interface IProps {
  $height?: number;
}

export const Container = styled.div<IProps>`
  width: 100%;
  height: ${props => props.$height + 'px' || '200px'};
`;
