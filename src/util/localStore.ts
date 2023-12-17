import { createStore, Store } from 'state-pool';

const KEY_PREFIX = 'ts-platform:';

export const createLocalStore = (
  initialStateKey = '',
  initialStateValue = null
): Store => {
  const store = createStore();
  if (initialStateKey) {
    store.setState(KEY_PREFIX + initialStateKey, initialStateValue);
  }
  return store;
};

export const useValue = <T = any>(store: Store, key: string) => {
  return store.useState<T>(KEY_PREFIX + key);
};

export const setValue = <T = any>(store: Store, key: string, value: T) => {
  store.setState<T>(KEY_PREFIX + key, value);
};

export const updateValue = <T = any>(store: Store, key: string, value: T) => {
  store.getState<T>(KEY_PREFIX + key).setValue(value);
};
