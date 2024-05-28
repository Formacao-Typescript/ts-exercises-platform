import store, { STATE_KEY, startLoading } from '@/store/exercises';
import { useUser } from '@/store/user';
import { IExercisesStoreState, IJourney, IRawJourney } from '@/types/index';
import { fetchMetadataJSON } from '@/utils/metadata';
import { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_JOURNEY_BASE_URL as string;

const useJourneys = (): [IJourney[], boolean, () => Promise<void>] => {
  const [exercises] = store.useState<IExercisesStoreState>(STATE_KEY);
  const [journeys, setJourneys] = useState(exercises.journeys);
  const [user] = useUser();

  useEffect(() => {
    console.log('user', user);
  }, [user]);

  useEffect(() => {
    if (!exercises?.journeys || exercises.journeys.length === 0) {
      void loadJourneys();
    }
  }, [exercises]);

  const loadJourneys = async () => {
    startLoading();
    const data = await fetchMetadataJSON<IRawJourney[]>(BASE_URL);

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

  return [journeys, exercises.isLoading, loadJourneys];
};

export default useJourneys;
