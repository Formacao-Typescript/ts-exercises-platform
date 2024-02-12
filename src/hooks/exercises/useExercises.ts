import { store, STATE_KEY } from '@/store/exercises';
import { IExercises } from '@/types';
import { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_JOURNEY_BASE_URL;

const useExercises = () => {
  const [exercises, , updateExercises] = store.useState<IExercises>(STATE_KEY);
  const [journeys, setJourneys] = useState(exercises.journeys);

  const loadJourneys = async () => {
    console.log('useJourneys.loadJourneys');
    updateExercises(_exercises => ({ ..._exercises, isLoading: true }));
    const response = await fetch(`${BASE_URL}/metadata.json`);
    const data = await response.json();
    setJourneys(data);
    store.setState(STATE_KEY, { journeys: data, isLoading: false });
  };

  useEffect(() => {
    if (exercises.journeys.length === 0) {
      loadJourneys();
    }
  }, [exercises]);

  return {
    isLoading: exercises.isLoading,
    isEmpty: journeys.length === 0,
    journeys,
    loadJourneys,
  };
};

export default useExercises;
