import store from './setup';

const STATE_KEY = 'appnavigation';

interface INavigationStore {
  pageTransitionBubble: {
    open: boolean;
    position: [number, number];
    color?: 'green' | 'red' | 'yellow' | 'blue';
  };
}

const INITIAL_STATE: INavigationStore = {
  pageTransitionBubble: {
    open: false,
    position: [0, 0],
  },
};

Object.keys(INITIAL_STATE).forEach(key => {
  store.setState(
    `${STATE_KEY}:${key}`,
    INITIAL_STATE[key as keyof INavigationStore],
    { persist: true }
  );
});

export const usePageTransitionBubble = () => {
  return store.useState<INavigationStore['pageTransitionBubble']>(
    `${STATE_KEY}:pageTransitionBubble`
  );
};
