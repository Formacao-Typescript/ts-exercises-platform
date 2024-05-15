import TiledBackground from '@/components/TiledBackground';
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
import { Footer } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const BUILD_NUMBER = import.meta.env.VITE_BUILD_NUMBER as string;

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <TiledBackground />
      <div className="text-white w-full h-full flex items-center justify-center relative">
        <span className="absolute bottom-0 right-0 text-gray-800 mr-2">
          Build: {BUILD_NUMBER}
        </span>
        <div className="w-9/12">
          <header className="bg-trade-gray px-8 py-4 rounded-md w-full">
            <Link to="/" className="flex justify-between">
              <img
                src={AppLogo}
                className="mr-3 h-6 sm:h-9"
                alt="Formação TS Logo"
              />
              <button
                type="button"
                className="text-xs text-white uppercase rounded-md px-8 py-2 bg-gradient-to-r from-trade-light-blue to-trade-blue hover:scale-105 transition-all duration-200"
              >
                Acessar conteúdos
              </button>
            </Link>
          </header>
          <main className="h-auto flex items-center justify-center py-3">
            {children}
          </main>
          <footer>
            <div className="w-full">
              <Footer.Divider className="m-4" />
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
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
