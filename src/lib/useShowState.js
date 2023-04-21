import { useReducer, useEffect } from 'react';

const usePersistedState = (reducer, initialState, sessionStorageKey) => {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persistedValue = sessionStorage.getItem(sessionStorageKey);

    return persistedValue ? JSON.parse(persistedValue) : initial;
  });

  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(state));
  }, [state, sessionStorageKey]);

  return [state, dispatch];
};

const showStateReducer = (currentStarred, action) => {
  currentStarred = action.content;
  return currentStarred;
};

export const useShowsState = () => {
  return usePersistedState(showStateReducer, '', 'showState');
};
