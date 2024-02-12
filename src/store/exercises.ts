import { IExercises, IJourney } from '@/types';
import store from './setup';

const STATE_KEY = 'exercises';
const INITIAL_STATE: IExercises = {
  isLoading: true,
  journeys: [],
  selectedJourney: null,
};

store.setState(STATE_KEY, INITIAL_STATE);

const _startLoading = () => {
  store.setState(STATE_KEY, { isLoading: true });
};

export const useJourney = (journeyId: IJourney['id']) => {
  _startLoading();
  // const [exercises] = store.useState<IExercises>(STATE_KEY);
  // return exercises.journeys.find(journey => journey.id === journeyId);
};

export { store, STATE_KEY };
