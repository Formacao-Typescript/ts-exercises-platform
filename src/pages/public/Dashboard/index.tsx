import React, { useEffect } from 'react';
// import MonacoMockup from '../../../assets/monaco-mockup.png';

import JourneyCard from './JourneyCard';
import { useNavigate } from 'react-router-dom';
import { updateActivityProgress, useUser } from '@/store/user';
import { useExercises } from '@/hooks';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, , updateUser] = useUser();
  const { isLoading, isEmpty, journeys } = useExercises();
  useEffect(() => {
    console.log('user', user);
    // if (user.name !== 'jose') {
    //   updateUser(user => (user.name = 'jose'));
    // }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (isEmpty) return <div>No journeys found</div>;

  return (
    <section className="bg-white dark:bg-gray-900 h-full">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Trilhas/Jornadas personalizadas
          </h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
            Acompanhe o aprendizado em jornadas categorizadas por nível de
            aprendizado, cada uma contendo temas específicos com uma série de
            atividades interativas!
          </p>
        </div>
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          {journeys.map(journey => (
            <JourneyCard
              key={journey.id}
              journey={journey}
              onClick={() => navigate('/journey/' + journey.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
