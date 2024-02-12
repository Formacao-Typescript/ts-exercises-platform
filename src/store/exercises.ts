import { IExercises, IJourney } from '@/types';
import store from './setup';

const STATE_KEY = 'exercises';
const INITIAL_STATE: IExercises = {
  isLoading: true,
  journeys: [],
  selectedJourney: null,
};

store.setState(STATE_KEY, INITIAL_STATE);

const startLoading = () => {
  store.setState(STATE_KEY, { isLoading: true });
};

export { store, STATE_KEY, startLoading };
