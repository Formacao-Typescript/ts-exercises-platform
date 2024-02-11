import { IUser } from '@/types';
import store from './setup';

const STATE_KEY = 'user';
const INITIAL_STATE: IUser = {
  id: '',
  name: '',
  email: '',
  progress: [],
};

store.setState<IUser>(STATE_KEY, INITIAL_STATE);

export const useUser = () => {
  return store.useState<IUser>(STATE_KEY);
};

export default store;
