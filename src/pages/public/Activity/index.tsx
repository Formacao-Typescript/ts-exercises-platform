import React from 'react';
// import MonacoMockup from '../../../assets/monaco-mockup.png';

import ExerciseRenderer from '@/components/ExerciseRenderer';
// import MonacoEditor from '@/components/MonacoEditor';
// import { Alert, Card, Progress } from 'flowbite-react';
import { useParams } from 'react-router-dom';
import { useActivity, useTopic } from '@/hooks';

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
