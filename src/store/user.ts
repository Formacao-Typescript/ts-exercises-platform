import { IActivity, IJourney, ITopic, IUser } from '@/types';
import store from './setup';
import _ from 'lodash';

const STATE_KEY = 'user';
const INITIAL_STATE: IUser = {
  id: '',
  name: '',
  email: '',
  progress: {
    journeys: {},
    topics: {},
    activities: [],
  },
};

store.setState<IUser>(STATE_KEY, INITIAL_STATE, { persist: true });

export const useUser = () => {
  return store.useState<IUser>(STATE_KEY);
};

export const updateActivityProgress = (
  journeyId: IJourney['id'],
  topicId: ITopic['id'],
  activityId: IActivity['id']
) => {
  store.getState<IUser>(STATE_KEY).setValue(user => {
    const { journeys, topics, activities } = _.cloneDeep(user.progress);

    const done = activities.includes(activityId);

    // checking activity
    if (!done) {
      activities.push(activityId);

      if (topics[topicId]) {
        topics[topicId] += 1;
      } else {
        // first time doing activity on this topic
        topics[topicId] = 1;
        journeys[journeyId] = (journeys[journeyId] || 0) + 1;
      }
    } else {
      // unchecking activity
      _.remove<IActivity['id']>(activities, id => id === activityId);
      topics[topicId] -= 1;
      if (topics[topicId] === 0) {
        delete topics[topicId];

        journeys[journeyId] -= 1;
        if (journeys[journeyId] === 0) delete journeys[journeyId];
      }
    }
    return { ...user, progress: { journeys, topics, activities } };
  });
};

export default store;
