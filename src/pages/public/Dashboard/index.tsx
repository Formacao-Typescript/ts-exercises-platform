import React, { useEffect } from 'react';
// import MonacoMockup from '../../../assets/monaco-mockup.png';

import JourneyCard from '@/components/journey/JourneyCard';
import { useNavigate } from 'react-router-dom';
import { updateActivityProgress, useUser } from '@/store/user';
import { useJourneys } from '@/store/exercises';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, , updateUser] = useUser();
  const { isLoading, isEmpty, journeys } = useJourneys();
  useEffect(() => {
    // console.log('user', user);
    if (user.name !== 'jose') {
      updateUser(user => (user.name = 'jose'));
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (isEmpty) return <div>No journeys found</div>;

  return (
    <div className="p-4 bg-gray-600 min-h-full">
      <button
        type="button"
        onClick={() =>
          updateActivityProgress('journey-id-1', 'topic-id-1', 'activity-id-1')
        }
      >
        Atualizar atividade eu fiz
      </button>
      <button
        type="button"
        onClick={() =>
          updateActivityProgress('journey-id-2', 'topic-id-2', 'activity-id-2')
        }
      >
        Atualizar atividade eu fiz 2
      </button>
      <div className="grid grid-cols-3 gap-4">
        {journeys.map(journey => (
          <JourneyCard
            key={journey.id}
            journey={journey}
            onClick={() => navigate('/journey/' + journey.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
