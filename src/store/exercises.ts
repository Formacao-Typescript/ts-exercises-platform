import { IExercises } from '@/types';
import store from './setup';

const STATE_KEY = 'exercises';
const INITIAL_STATE: IExercises = {
  journeys: [],
};

store.setState(STATE_KEY, INITIAL_STATE);
