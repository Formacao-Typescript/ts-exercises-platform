import FTSLogo from '@/components/FTSLogo';
import TiledBackground from '@/components/TiledBackground';
import { AppLogo } from '@/shared/marketing';

import React from 'react';
import { Link } from 'react-router-dom';

const BUILD_NUMBER = import.meta.env.VITE_BUILD_NUMBER as string;

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <TiledBackground />
      <div className="text-white w-full min-h-screen flex items-center justify-center relative overflow-hidden">
        <span className="absolute bottom-0 right-0 text-gray-800 mr-2">
          Build: {BUILD_NUMBER}
        </span>
        <span className="absolute top-[-600px] right-[-600px] mr-2 w-[1200px] h-[1200px] bg-gradient-radial from-trade-light-blue via-trade-blue via-20% to-60% to-transparent rounded-full opacity-50"></span>
        <div className="w-10/12 xl:w-9/12 2xl:w-8/12 min-h-screen flex flex-col justify-center relative">
          <header className="bg-trade-gray px-8 py-4 rounded-lg absolute top-10 w-full">
            <Link to="/" className="flex justify-between items-center">
              <FTSLogo scale={1.2} />
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
          {/* <footer>
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
          </footer> */}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
