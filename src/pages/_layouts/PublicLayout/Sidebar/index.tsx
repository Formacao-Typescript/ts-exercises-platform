import React from 'react';

import { Container } from './styles';
import {
  MdOutlineKeyboardArrowDown as ArrowDownIcon,
  MdClose as CloseIcon,
} from 'react-icons/md';

const Sidebar: React.FC = () => {
  return (
    <Container className="bg-gray-100">
      <header>
        <h2>section title</h2>
        <CloseIcon />
      </header>
      <ol className="navigation-list">
        <div className="navigation-list-info">
          <h3>Compatibilidade de tipos</h3>
          <ArrowDownIcon />
        </div>
        <li className="navigation-list-item">
          <ul className="activity-list">
            <li className="activity-list-item">Activity 1</li>
            <li className="activity-list-item">Activity 2</li>
            <li className="activity-list-item">Activity 3</li>
          </ul>
        </li>
        <li className="navigation-list-item">
          <div className="navigation-list-info">
            <h3>Tipos primitivos</h3>
            <ArrowDownIcon />
          </div>
          <ul className="activity-list">
            <li className="activity-list-item">Activity 1</li>
            <li className="activity-list-item">Activity 2</li>
            <li className="activity-list-item">Activity 3</li>
          </ul>
        </li>
      </ol>
    </Container>
  );
};

export default Sidebar;
