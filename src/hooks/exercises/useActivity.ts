import { store, STATE_KEY, startLoading } from '@/store/exercises';
import { IActivity, IExercisesStoreState, IJourney, ITopic } from '@/types';
import { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_JOURNEY_BASE_URL;

const useActivity = (
  journeyId?: IJourney['id'],
  topicId?: ITopic['id'],
  activityId?: IActivity['id']
) => {
  const [exercises] = store.useState<IExercisesStoreState>(STATE_KEY);
  const [activity, setActivity] = useState<IActivity>();
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    if (!journeyId || !topicId) return void 0;

    // activities not loaded yet
    if (activities?.length === 0) {
      loadActivities();
      return void 0;
    }

    // no activity specified
    if (!activityId) {
      // TODO: load latest user activity from this topic OR first activity available
      setActivity(activities[0]);
      return void 0;
    }

    const _activity = activities.find(a => a.id === activityId);
    // activity not found
    if (!_activity) {
      return void 0;
    }

    // load chosen activity
    setActivity(_activity);
  }, [activities]);

  const loadActivities = async () => {
    startLoading();
    const response = await fetch(
      `${BASE_URL}/${journeyId}/${topicId}/metadata.json`
    );
    const data = (await response.json()) as IActivity[];
    const _activities = data.map(rawActivity => ({
      ...rawActivity,
      source: `${BASE_URL}/${journeyId}/${topicId}/${rawActivity.source}`,
    }));
    setActivities(_activities);
    store.setState(STATE_KEY, { activities: _activities, isLoading: false });
  };

  return {
    activity,
    activities,
    isLoading: exercises.isLoading,
  };
};

export default useActivity;
