import React from 'react';

import { Container, Content, Sidebar } from './styles';

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
        <Sidebar className="bg-gray-100">
          <header>
            <h2>section title </h2>
            <button type="button">X</button>
          </header>
          <div className="navigation-list">
            <div>abo</div>
          </div>
        </Sidebar>
      </main>
      <footer className="bg-primary-25">
        <p>Lsantos copyrights</p>
      </footer>
    </Container>
  );
};

export default PublicLayout;
