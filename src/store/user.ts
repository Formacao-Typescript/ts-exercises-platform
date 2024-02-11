import { IUser } from '@/types';
import { createLocalStore, updateValue, useValue } from '@/util/localStore';
const STORE_KEY = 'user';
const INITIAL_STATE: IUser = {
  id: '',
  name: '',
  email: '',
  progress: [],
};

const store = createLocalStore<IUser>(STORE_KEY, INITIAL_STATE);

export const login = (user: IUser) => {
  updateValue(store, STORE_KEY, user);
};

export const useUser = () => {
  return useValue(store, STORE_KEY);
};

export default store;
