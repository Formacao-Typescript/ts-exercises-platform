import { IActivityIdentifier } from '../../types/Exercises';
import { IActivity, IRemoteUser, IUser } from 'types/index';
import store from './setup';
import _ from 'lodash';
import { toast } from 'react-toastify';

const STATE_KEY = 'user';
const INITIAL_STATE: IUser = {
  id: '',
  email: '',
  username: '',
  global_name: '',
  progress_raw: [],
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

// TODO: create strategy for saving progress from time to time if there are changes, or on specific actions
export const updateActivityProgress = ({
  journeyId,
  topicId,
  activityId,
}: IActivityIdentifier) => {
  store.getState<IUser>(STATE_KEY).setValue(user => {
    const { progress_raw, progress } = _.cloneDeep(user);
    const { journeys, topics, activities } = progress;

    const done = activities.includes(activityId);
    const rawKey = `${journeyId}/${topicId}/${activityId}`;

    // checking activity
    if (!done) {
      progress_raw.push(rawKey);
      activities.push(activityId);

      if (topics[topicId]) {
        topics[topicId] += 1;
      } else {
        // first time doing activity on this topic
        topics[topicId] = 1;
        journeys[journeyId] = (journeys[journeyId] || 0) + 1;
      }

      toast.success('Atividade concluída!');
    } else {
      // unchecking activity
      _.remove<string>(progress_raw, key => key === rawKey);
      _.remove<IActivity['id']>(activities, id => id === activityId);

      topics[topicId] -= 1;
      if (topics[topicId] === 0) {
        delete topics[topicId];

        journeys[journeyId] -= 1;
        if (journeys[journeyId] === 0) delete journeys[journeyId];
      }
      toast.info('Atividade desmarcada!');
    }
    return {
      ...user,
      progress: { journeys, topics, activities },
      progress_raw,
    };
  });
};

export const mergeLocalAndRemoteUser = (
  localUser: IUser,
  remoteUser: IRemoteUser
): IUser => {
  const mergedRawProgress = _.uniq([
    ...localUser.progress_raw,
    ...remoteUser.progress_raw,
  ]);

  const progress: IUser['progress'] = {
    journeys: {},
    topics: {},
    activities: [],
  };

  mergedRawProgress.forEach(rawKey => {
    const [journeyId, topicId, activityId] = rawKey.split('/');

    progress.journeys[journeyId] = (progress.journeys[journeyId] || 0) + 1;
    progress.topics[topicId] = (progress.topics[topicId] || 0) + 1;
    progress.activities.push(activityId);
  });

  return {
    ...localUser,
    ...remoteUser,
    progress_raw: mergedRawProgress,
    progress,
  };
};

export const signOut = () => {
  store.setState<IUser>(STATE_KEY, INITIAL_STATE);
  toast.success(
    _.sample([
      'Até a próxima!',
      'Hasta la vista!',
      'Arrivederci!',
      'Que a porta bata onde o sol não bate!',
    ])
  );
};

export default store;
