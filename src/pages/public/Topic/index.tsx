import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useTopic } from '@/hooks';

const Topic: React.FC = () => {
  const { journeyId, topicId, activityId } = useParams<{
    journeyId: string;
    topicId: string;
    activityId: string;
  }>();
  const topic = useTopic(journeyId, topicId);

  if (activityId) {
    return <Outlet />;
  }

  return (
    <div className="p-4 w-full h-full bg-gray-900 text-white">
      {topic?.name}
    </div>
  );
};

export default Topic;
