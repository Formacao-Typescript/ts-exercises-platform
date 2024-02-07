import React from 'react';
// import MonacoMockup from '../../../assets/monaco-mockup.png';

import MOCK_DATA from '@/assets/data.mock';
import ExerciseRenderer from '@/components/ExerciseRenderer';
// import MonacoEditor from '@/components/MonacoEditor';
// import { Alert, Card, Progress } from 'flowbite-react';
import { useParams } from 'react-router-dom';
import { ITopic } from '@/types';

const useTopic = (journeyId?: string, topicId?: string): ITopic | undefined => {
  if (!journeyId || !topicId) return undefined;
  const journey = MOCK_DATA.find(journey => journey.id === journeyId);

  if (!journey) return undefined;
  return journey.topics.find(topic => topic.id === topicId);
};

const useActivity = (topic?: ITopic, activityId?: string) => {
  if (!activityId || !topic) return null;

  return topic.activities.find(activity => activity.id === activityId);
};

const Activity: React.FC = () => {
  const { journeyId, topicId, activityId } = useParams<{
    journeyId: string;
    topicId: string;
    activityId: string;
  }>();
  const topic = useTopic(journeyId, topicId);
  const activity = useActivity(topic, activityId);
  // const navigate = useNavigate();

  if (!activity)
    return (
      <div className="p-4 bg-gray-900 text-white">
        <h1>Activity not found</h1>
      </div>
    );

  return (
    <div className="p-4 w-full bg-gray-900 text-white">
      <h1>{activity.name}</h1>

      <ExerciseRenderer source={activity.source}></ExerciseRenderer>
    </div>
  );
};

export default Activity;
