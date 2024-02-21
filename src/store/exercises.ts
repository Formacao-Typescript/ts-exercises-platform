import { IExercisesStoreState } from '@/types';
import store from './setup';

const STATE_KEY = 'exercises';
const INITIAL_STATE: IExercisesStoreState = {
  isLoading: true,
  journeys: [],
  selectedJourney: null,
  activities: [],
  selectedTopics: [],
};

store.setState(STATE_KEY, INITIAL_STATE);

const startLoading = () => {
  store.setState(STATE_KEY, { isLoading: true });
};

export { STATE_KEY, startLoading };

export default store;
