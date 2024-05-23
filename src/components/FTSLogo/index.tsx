import React from 'react';

interface Props {
  scale: number;
}
import { Container } from './styles';
const FTSLogo: React.FC<Props> = ({ scale }) => {
  return (
    <Container className="logo" scale={scale}>
      <div className="logo-background">
        <div className="logo-content">
          <span className="logo-content-slashes">{'//'}</span>
          <span className="logo-content-text">formação</span>
          <span className="logo-content-ts">TS</span>
        </div>
      </div>
    </Container>
  );
};

export default FTSLogo;
