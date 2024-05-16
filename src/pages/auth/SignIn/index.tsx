import { getAuthorizationCodeUrl } from '@/services/discord';
import React from 'react';
import { FaDiscord as DiscordIcon } from 'react-icons/fa';
import { Container, HeroBanner, CTABanner } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container className="relative w-full flex justify-between flex-col lg:flex-row items-center lg:items-start">
      <HeroBanner>
        <h1>
          Junte-se à{' '}
          <strong className="text-ts-gradient-horizontal">Comunidade!</strong>
        </h1>
        <p>
          A Plataforma da <strong>Formação TS</strong> <b>é gratuita</b> pra
          aprender, e você <b>nem precisa de uma conta!</b>
        </p>

        <ul>
          <li>Aprender dinâmicamente com atividades práticas</li>
          <li>Acessar todos os exercícios</li>
          <li>Visualizar conteúdo organizado por módulos</li>
        </ul>
      </HeroBanner>
      <section>
        <CTABanner className="rounded-lg bg-trade-gray">
          <p>
            Crie sua conta e salve checklists de atividades feitas (em nuvem) e
            acumule pontos na plataforma (xp).
          </p>
          <button
            type="button"
            onClick={() => {
              window.location.href = getAuthorizationCodeUrl();
            }}
          >
            <DiscordIcon className="w-4 h-4 me-2" />
            Login com o Discord
          </button>
        </CTABanner>

        <CTABanner className="rounded-lg bg-trade-gray">
          <p>
            Deixe suas contribuições em áreas exclusivas, receba em primeira mão
            artigos, palestras e eventos e converse com outros membros da
            comunidade junto com os criadores da plataforma!
          </p>
          <button
            type="button"
            className="text-sm"
            onClick={() => {
              window.location.href = getAuthorizationCodeUrl();
            }}
          >
            <DiscordIcon className="w-4 h-4 me-2" />
            Entrar na comunidade
          </button>
        </CTABanner>
      </section>
    </Container>
  );
};

export default SignIn;
