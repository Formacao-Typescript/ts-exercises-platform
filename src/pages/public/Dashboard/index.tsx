import React from 'react';
// import MonacoMockup from '../../../assets/monaco-mockup.png';

import { Card, Progress } from 'flowbite-react';
import MOCK_DATA from '@/assets/data.mock';

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 bg-gray-600 min-h-full">
      <div className="grid grid-cols-3 gap-4">
        {MOCK_DATA.map((journey, index) => (
          <div key={journey.id} className="col-span-1">
            <Card
              className="max-w-sm"
              renderImage={() => (
                <img
                  src="https://placehold.co/500x500"
                  width={500}
                  height={500}
                  alt="image 1"
                />
              )}
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {journey.name}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {journey.longDescription}
              </p>
              <Progress
                progress={index * 25}
                progressLabelPosition="inside"
                textLabel="Progresso"
                textLabelPosition="outside"
                size="lg"
                labelProgress
                labelText
              />
            </Card>
          </div>
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
