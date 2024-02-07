import React from 'react';
// import MonacoMockup from '../../../assets/monaco-mockup.png';
import { Container } from './styles';

import MonacoEditor from '@/components/MonacoEditor';
import ExerciseRenderer from '@/components/ExerciseRenderer';
import { Alert } from 'flowbite-react';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <h1>Dashboard</h1>
      <Alert color="info">
        <span className="font-medium">Info alert!</span> Change a few things up
        and try submitting again.
      </Alert>
      <MonacoEditor code="console.log('banana')" />
      <ExerciseRenderer source="exercises/SAMPLE.md"></ExerciseRenderer>
    </Container>
  );
};

export default Dashboard;
