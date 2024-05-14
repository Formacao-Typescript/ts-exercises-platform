import React from 'react';

import { Button, Navbar, Footer } from 'flowbite-react';

import { Container } from './styles';
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import {
  AppLogo,
  LINKS,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  LinkedinIcon,
  MailIcon,
} from '@/shared/marketing';
import useMediaQuery from '@/hooks/util/useMediaQuery';
// import Sidebar from './Sidebar';

const BUILD_NUMBER = import.meta.env.VITE_BUILD_NUMBER as string;

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return (
      <Container>
        <div className="h-screen flex justify-center">
          <div className="text-white text-center w-2/3 h-auto self-center">
            <h1 className="text-4xl tracking-tight font-extrabold mb-4">
              Não temos suporte a celulares ainda
            </h1>
            <h2 className="font-light mb-4">
              Para sua melhor experiência, recomendamos usar um tablet ou
              notebook maiores por enquanto.
            </h2>
            <p>
              Mas não se preocupe, adicionaremos suporte a dispositivos móveis
              logo logo!
            </p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Navbar fluid>
        <Link to="/" className="flex">
          <img
            src={AppLogo}
            className="mr-3 h-6 sm:h-9"
            alt="Formação TS Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Plataforma de exercícios
          </span>
        </Link>

        <div className="flex md:order-2">
          <Link to="/auth">
            <Button>Sign in</Button>
          </Link>
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
      <main className="bg-white dark:bg-gray-900 dark:text-white w-full h-full relative flex flex-col">
        <Breadcrumb className="m-2" />
        <div className="max-w-screen-xl">{children}</div>
      </main>
      <Footer className="px-4 py-2 rounded-none">
        <div className="w-full">
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:items-center space-x-4">
              <Footer.Copyright
                href={LINKS.formacao}
                by="LSantosDev"
                year={2024}
              />
            </div>
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon href={LINKS.instagram} icon={InstagramIcon} />
              <Footer.Icon href={LINKS.facebook} icon={FacebookIcon} />
              <Footer.Icon href={LINKS.twitter} icon={TwitterIcon} />
              <Footer.Icon href={LINKS.youtube} icon={YoutubeIcon} />
              <Footer.Icon href={LINKS.linkedin} icon={LinkedinIcon} />
              <Footer.Icon href={LINKS.mail} icon={MailIcon} />
            </div>
          </div>
          <Footer.Divider className="m-4" />
          <div className="flex sm:items-center sm:justify-between mb-2">
            <div className="flex justify-center items-center">
              <Footer.Brand
                href={LINKS.formacao}
                src={AppLogo}
                alt="Formação Typescript Logo"
              />
              <span className="text-slate-600">Build: {BUILD_NUMBER}</span>
            </div>
            <Footer.Copyright
              href={LINKS.formacao}
              by="LS Consulting CNPJ: 480.719.05/0001-89. Todos os direitos reservados."
            />
          </div>
        </div>
      </Footer>
    </Container>
  );
};

export default PublicLayout;
