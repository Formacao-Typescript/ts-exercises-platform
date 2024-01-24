import React from 'react';
// import MonacoMockup from '../../../assets/monaco-mockup.png';
import { Container } from './styles';

import MonacoEditor from '@/components/MonacoEditor';
import ExerciseRenderer from '@/components/ExerciseRenderer';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <h1>Dashboard</h1>
      <MonacoEditor code="console.log('banana')" />
      <ExerciseRenderer source="exercises/SAMPLE.md"></ExerciseRenderer>
    </Container>
  );
};

export default Dashboard;
