import React from 'react';
// import MonacoMockup from '../../../assets/monaco-mockup.png';

import MOCK_DATA from '@/assets/data.mock';
import JourneyCard from '@/components/journey/JourneyCard';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4 bg-gray-600 min-h-full">
      <div className="grid grid-cols-3 gap-4">
        {MOCK_DATA.map(journey => (
          <JourneyCard
            key={journey.id}
            journey={journey}
            onClick={() => navigate('/journey/' + journey.id)}
          />
        ))}
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
