import React from 'react';
// import MonacoMockup from '../../../assets/monaco-mockup.png';
import { Container } from './styles';

import MonacoEditor from '../../../components/MonacoEditor';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <h1>Dashboard</h1>
      <MonacoEditor code="console.log('banana')" />
    </Container>
  );
};

export default Dashboard;
