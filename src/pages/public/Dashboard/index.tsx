import React from 'react';
import MonacoMockup from '../../../assets/monaco-mockup.png';
import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <h1>Dashboard</h1>
      <img src={MonacoMockup} alt="Monaco Mockup" />
    </Container>
  );
};

export default Dashboard;
