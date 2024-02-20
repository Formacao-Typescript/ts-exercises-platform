import React from 'react';
import { useParams } from 'react-router-dom';
import { useActivities, useActivity, useSearchParams } from '@/hooks';
import ExerciseRenderer from '@/components/ExerciseRenderer';
import ActivityListSidebar from './ActivityListSidebar';

const Topic: React.FC = () => {
  const { journeyId, topicId } = useParams();
  const { activityId } = useSearchParams('activityId');
  const [activities, isLoadingActivities] = useActivities(journeyId, topicId);
  const [activity, isLoadingActivity] = useActivity(activityId, activities);

  if (!activity)
    return (
      <div className="p-4 bg-gray-900 text-white">
        <h1>Topic not found</h1>
      </div>
    );

  return (
    <>
      {activity?.name}
      <div className="w-11/12">
        <ExerciseRenderer source={activity.source}></ExerciseRenderer>
        <ActivityListSidebar
          activityIdentifier={{
            journeyId: journeyId!,
            topicId: topicId!,
            activityId: activity!.id,
          }}
          activities={activities}
          className="absolute top-0 right-0 h-full bg-white dark:bg-gray-800 shadow-lg"
        />
      </div>
    </>
  );
};

export default Topic;
