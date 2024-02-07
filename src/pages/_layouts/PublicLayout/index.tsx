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
import { Container, Content } from './styles';
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

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Container>
      <Navbar fluid rounded>
        <Navbar.Brand href={LINKS.formacao}>
          <img
            src={LogoImg}
            className="mr-3 h-6 sm:h-9"
            alt="Formação TS Logo"
          />
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
      <Footer className="px-4 py-2 rounded-none">
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:items-center space-x-4">
            <Footer.Brand
              href={LINKS.formacao}
              src={LogoImg}
              alt="Formação Typescript Logo"
            />
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
      </Footer>
    </Container>
  );
};

export default PublicLayout;
