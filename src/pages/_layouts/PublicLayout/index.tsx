import React from 'react';

import { Container, Content } from './styles';
// import Sidebar from './Sidebar';
import Logo from '@/assets/logo-formacaots-hotmart.webp';

import { Button, Navbar } from 'flowbite-react';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Container>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://formacaots.com.br/">
          <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Formação TS Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Plataforma de exercícios
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button>Sign in</Button>
          <Navbar.Toggle />
        </div>

        <Navbar.Collapse>
          <Navbar.Link href="#" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <main>
        <Content>{children}</Content>
        {/* <Sidebar /> */}
      </main>
      <footer className="bg-primary-25">
        <p>Lsantos copyrights</p>
      </footer>
    </Container>
  );
};

export default PublicLayout;
