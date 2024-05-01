import { getAuthorizationCodeUrl } from '@/services/discord';
import React from 'react';
import { FaDiscord as DiscordIcon } from 'react-icons/fa';

const AuthLayout: React.FC = () => {
  return (
    <div className="">
      <h1 className="font-semibold text-xl">Junte-se à comunidade!</h1>

      <section className="unregistered-tier">
        <p className="font-light mb-3">
          A <b>Plataforma da Formação TS</b> é gratuita pra aprender, e você nem
          precisa de uma conta!
          <br />
          Mesmo sem login você pode:
          <ul>
            <li>- Aprender dinâmicamente com atividades práticas</li>
            <li>- Acessar todos os exercícios</li>
            <li>- Visualizar conteúdo organizado por módulos</li>
          </ul>
        </p>
      </section>

      <section className="registered-tier">
        Criando sua conta você terá acesso a funcionalidades exclusivas como:
        <ul>
          <li>- Salvar checklist de atividades feitas (em núvem)</li>
          <li>- Contagem arbitrária de pontos (XP)</li>
        </ul>
        <button
          type="button"
          className="text-white bg-[#5F69F3] hover:bg-[#5F69F3]/90 focus:ring-4 focus:outline-none focus:ring-[#5F69F3]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#5F69F3]/55 me-2 mb-2"
          onClick={() => {
            window.location.href = getAuthorizationCodeUrl();
          }}
        >
          <DiscordIcon className="w-4 h-4 me-2" />
          Login com Discord
        </button>
      </section>

      <section className="community-tier">
        Fazendo parte da comunidade responsável pela plataforma você pode:
        <ul>
          <li>- deixar sua contribuição nas áreas exclusivas da comunidade</li>
          <li>- receber em primeira mão artigos, palestras e eventos</li>

          <li>
            - conversar com outros membros da comunidade e com os criadores da
            plataforma
          </li>
        </ul>
        <button
          type="button"
          className="text-white bg-[#5F69F3] hover:bg-[#5F69F3]/90 focus:ring-4 focus:outline-none focus:ring-[#5F69F3]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#5F69F3]/55 me-2 mb-2"
        >
          <DiscordIcon className="w-4 h-4 me-2" />
          Fazer parte da comunidade
        </button>
      </section>
    </div>
  );
};

export default AuthLayout;
