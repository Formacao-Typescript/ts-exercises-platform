import { createStore } from 'state-pool';

const KEY_PREFIX = 'ts-platform:';
const store = createStore();

store.persist({
  // PERSIST_ENTIRE_STORE: true, // Use this only if you want to persist the entire store
  saveState: function (key, value, isInitialSet) {
    const doStateSaving = () => {
      try {
        const serializedState = JSON.stringify(value);
        window.localStorage.setItem(KEY_PREFIX + key, serializedState);
      } catch {
        // Ignore write errors
      }
    };

    if (isInitialSet) {
      doStateSaving();
    } else {
      const DEBOUNCE_TIME = 1000;
      const debounce = (func: () => void, timeout: number): (() => void) => {
        let timer: NodeJS.Timeout;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            func.apply(this, args);
          }, timeout);
        };
      };
      debounce(doStateSaving, DEBOUNCE_TIME)();
    }
  },
  loadState: function (key, noState) {
    try {
      const serializedState = window.localStorage.getItem(KEY_PREFIX + key);
      if (serializedState === null) {
        // No state saved
        return noState;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      // Failed to load state
      return undefined;
    }
  },
  removeState: function (key) {
    window.localStorage.removeItem(KEY_PREFIX + key);
  },
  clear: function () {
    window.localStorage.clear();
  },
});

export default store;
