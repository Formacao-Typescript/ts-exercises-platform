import React from 'react';
import { useParams } from 'react-router-dom';
import { useActivity, useSearchParams } from '@/hooks';
import ExerciseRenderer from '@/components/ExerciseRenderer';
import ActivityListSidebar from './ActivityListSidebar';

const Topic: React.FC = () => {
  const { journeyId, topicId } = useParams();
  const { activityId } = useSearchParams('activityId');
  const { activity, activities } = useActivity(journeyId, topicId, activityId);

  if (!activity)
    return (
      <div className="p-4 bg-gray-900 text-white">
        <h1>Topic not found</h1>
      </div>
    );

  return (
    <>
      {activity.name}
      <div className="flex justify-between">
        {/* <ExerciseRenderer source={activity.source}></ExerciseRenderer> */}
        <ActivityListSidebar
          activityIdentifier={{
            journeyId: journeyId!,
            topicId: topicId!,
            activityId: activity.id,
          }}
          activities={activities}
        />
      </div>
    </>
  );
};

export default Topic;
