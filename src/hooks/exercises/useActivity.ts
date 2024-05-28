import store, { STATE_KEY } from '@/store/exercises';
import { useUser } from '@/store/user';
import { IActivity, IExercisesStoreState } from 'types/index';
import _ from 'lodash';
import { useEffect, useState } from 'react';

const useActivity = (
  activityId?: IActivity['id'],
  activitySet?: IActivity[]
): [IActivity | undefined, boolean] => {
  const [exercises] = store.useState<IExercisesStoreState>(STATE_KEY);
  const [activity, setActivity] = useState<IActivity>();
  const [user] = useUser();

  const activities = activitySet ?? exercises.activities;

  useEffect(() => {
    if (!activities || activities.length === 0) return void 0;

    // no activity specified
    if (!activityId) {
      // load latest user activity from this topic OR first activity available
      if (user.progress.activities?.length !== 0) {
        const remainingActivities = _.difference(
          activities.map(_activity => _activity.id),
          user.progress.activities
        );

        if (remainingActivities.length !== 0) {
          setActivity(
            activities.find(
              _activity => _activity.id === remainingActivities[0]
            )
          );
          return void 0;
        }
      }

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
  }, [activities, exercises]);

  return [activity, exercises.isLoading];
};

export default useActivity;
