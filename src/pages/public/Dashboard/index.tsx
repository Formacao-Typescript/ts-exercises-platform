import React, { useEffect } from 'react';
// import MonacoMockup from '../../../assets/monaco-mockup.png';

import MOCK_DATA from '@/assets/data.mock';
import JourneyCard from '@/components/journey/JourneyCard';
import { useNavigate } from 'react-router-dom';
import { updateActivityProgress, useUser } from '@/store/user';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, , updateUser] = useUser();
  useEffect(() => {
    // console.log('user', user);
    if (user.name !== 'jose') {
      updateUser(user => (user.name = 'jose'));
    }
  }, [user]);
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
        {MOCK_DATA.map(journey => (
          <JourneyCard
            key={journey.id}
            journey={journey}
            onClick={() => navigate('/journey/' + journey.id)}
          />
        ))}
        B
      </div>

      {/* <h1>Dashboard</h1>
      <Alert color="info">
        <span className="font-medium">Info alert!</span> Change a few things up
        and try submitting again.
      </Alert>
      <MonacoEditor code="console.log('banana')" />
      <ExerciseRenderer source="exercises/SAMPLE.md"></ExerciseRenderer> */}
    </div>
  );
};

export default Dashboard;
