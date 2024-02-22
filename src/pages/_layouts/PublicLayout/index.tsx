/* eslint-disable @typescript-eslint/no-unsafe-assignment */ // @FIXME: react-icons/something is throwing this error, check later
import React from 'react';

import {
  BsFacebook as FacebookIcon,
  BsInstagram as InstagramIcon,
  BsTwitter as TwitterIcon,
  BsYoutube as YoutubeIcon,
  BsLinkedin as LinkedinIcon,
  BsMailbox as MailIcon,
} from 'react-icons/bs';

import { Button, Navbar, Footer } from 'flowbite-react';

import LogoImg from '@/assets/logo-formacaots-hotmart.webp';
import { Container } from './styles';
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
// import Sidebar from './Sidebar';

const LINKS = {
  formacao: 'https://formacaots.com.br/',
  instagram: 'https://formacaots.com.br/instagram.lsantos.dev',
  facebook: 'https://formacaots.com.br/facebook.lsantos.dev',
  twitter: 'https://formacaots.com.br/twitter.lsantos.dev',
  youtube: 'https://formacaots.com.br/youtube.lsantos.dev',
  linkedin: 'https://formacaots.com.br/linkedin.lsantos.dev',
  mail: 'mailto:hello@lsantos.dev',
};

const BUILD_NUMBER = import.meta.env.VITE_BUILD_NUMBER;

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Container>
      <Navbar fluid>
        <Link to="/" className="flex">
          <img
            src={LogoImg}
            className="mr-3 h-6 sm:h-9"
            alt="Formação TS Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Plataforma de exercícios
          </span>
        </Link>

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
      <main className="bg-white dark:bg-gray-900 dark:text-white w-full h-full relative flex flex-col">
        <Breadcrumb className="m-2" />
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-8 lg:px-6">
          {children}
        </div>
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
                src={LogoImg}
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
