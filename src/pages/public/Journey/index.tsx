import React from 'react';
// import MonacoMockup from '../../../assets/monaco-mockup.png';

import MOCK_DATA from '@/assets/data.mock';
import JourneyCard from '@/components/journey/JourneyCard';

const Journey: React.FC = () => {
  return (
    <div className="p-4 bg-gray-600 min-h-full">
      <div className="grid grid-cols-3 gap-4">
        {MOCK_DATA.map(journey => (
          <JourneyCard key={journey.id} journey={journey} />
        ))}
      </div>

      {/* <h1>Journey</h1>
      <Alert color="info">
        <span className="font-medium">Info alert!</span> Change a few things up
        and try submitting again.
      </Alert>
      <MonacoEditor code="console.log('banana')" />
      <ExerciseRenderer source="exercises/SAMPLE.md"></ExerciseRenderer> */}
    </div>
  );
};

export default Journey;
