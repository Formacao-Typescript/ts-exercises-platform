import React from 'react';

import { Container } from './styles';

const Sidebar: React.FC = () => {
  return (
    <Container className="bg-gray-100">
      <header>
        <h2>section title</h2>
        <button type="button">X</button>
      </header>
      <div className="navigation-list">
        <div>abo</div>
      </div>
    </Container>
  );
};

export default Sidebar;
