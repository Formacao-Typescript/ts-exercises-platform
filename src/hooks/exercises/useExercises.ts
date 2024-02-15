import { store, STATE_KEY, startLoading } from '@/store/exercises';
import { useUser } from '@/store/user';
import { IExercisesStoreState, IJourney, IRawJourney } from '@/types';
import { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_JOURNEY_BASE_URL;

const useExercises = () => {
  const [exercises] = store.useState<IExercisesStoreState>(STATE_KEY);
  const [journeys, setJourneys] = useState(exercises.journeys);
  const [user] = useUser();

  useEffect(() => {
    if (exercises?.journeys?.length === 0) {
      loadJourneys();
    }
  }, [exercises]);

  const loadJourneys = async () => {
    startLoading();
    const response = await fetch(`${BASE_URL}/metadata.json`);
    const data = (await response.json()) as IRawJourney[];

    const journeys: IJourney[] = data.map(rawJourney => {
      return {
        id: rawJourney.id,
        name: rawJourney.name,
        shortDescription: rawJourney.shortDescription,
        longDescription: rawJourney.longDescription,
        topicCount: rawJourney.topicCount,
        progress: user.progress.journeys[rawJourney.id] || 0,
        topics: [],
      };
    });
    setJourneys(journeys);
    store.setState(STATE_KEY, { journeys: data, isLoading: false });
  };

  return {
    isLoading: exercises.isLoading,
    isEmpty: journeys.length === 0,
    journeys,
    loadJourneys,
  };
};

export default useExercises;
