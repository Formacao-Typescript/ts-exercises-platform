import React from 'react';

import { Container, Content } from './styles';
import Sidebar from './Sidebar';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Container>
      <header className="bg-primary-25 primary-600">
        <h1>TS Platform navigation</h1>
      </header>
      <main>
        <Content>{children}</Content>
        <Sidebar />
      </main>
      <footer className="bg-primary-25">
        <p>Lsantos copyrights</p>
      </footer>
    </Container>
  );
};

export default PublicLayout;
