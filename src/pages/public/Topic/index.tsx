import React from 'react';
import { useParams } from 'react-router-dom';
import { useActivity, useSearchParams, useTopic } from '@/hooks';
import ExerciseRenderer from '@/components/ExerciseRenderer';
import ActivityListSidebar from './ActivityListSidebar';

const Topic: React.FC = () => {
  const { journeyId, topicId } = useParams<{
    journeyId: string;
    topicId: string;
    activityId: string;
  }>();
  const { activityId } = useSearchParams('activityId');
  const topic = useTopic(journeyId, topicId);
  const activity = useActivity(topic, activityId);

  if (!topic)
    return (
      <div className="p-4 bg-gray-900 text-white">
        <h1>Topic not found</h1>
      </div>
    );

  return (
    <div className="p-4 w-full h-full bg-gray-900 text-white">
      {topic.name}
      {activity?.name}
      <div className="flex justify-between">
        <ExerciseRenderer source="exercises/SAMPLE.md"></ExerciseRenderer>
        <ActivityListSidebar activities={topic.activities} />
      </div>
    </div>
  );
};

export default Topic;
