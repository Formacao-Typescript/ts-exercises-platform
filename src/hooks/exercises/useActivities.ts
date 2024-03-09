import store, { STATE_KEY, startLoading } from '@/store/exercises';
import { IActivity, IExercisesStoreState, IJourney, ITopic } from '@/types';
import { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_JOURNEY_BASE_URL as string;

const useActivity = (
  journeyId?: IJourney['id'],
  topicId?: ITopic['id']
): [
  IActivity[],
  boolean,
  (journeyId?: IJourney['id'], topicId?: ITopic['id']) => Promise<void>,
] => {
  const [exercises] = store.useState<IExercisesStoreState>(STATE_KEY);
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    if (!journeyId || !topicId) return void 0;

    // activities not loaded yet
    if (activities?.length === 0) {
      void loadActivities(journeyId, topicId);
      return void 0;
    }
  }, [activities]);

  const loadActivities = async (
    _journeyId?: IJourney['id'],
    _topicId?: ITopic['id']
  ) => {
    startLoading();
    const response = await fetch(
      `${BASE_URL}/${_journeyId}/${_topicId}/metadata.json`
    );
    const data = (await response.json()) as IActivity[];
    const _activities = data.map(rawActivity => ({
      ...rawActivity,
      source: `${BASE_URL}/${_journeyId}/${_topicId}/${rawActivity.id}.md`,
    }));
    setActivities(_activities);
    store.setState(STATE_KEY, { activities: _activities, isLoading: false });
  };

  return [activities, exercises.isLoading, loadActivities];
};

export default useActivity;
