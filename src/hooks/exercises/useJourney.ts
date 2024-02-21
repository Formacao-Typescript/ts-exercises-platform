import { useUser } from '@/store/user';
import store from '@/store/exercises';
import { IJourney, IRawJourney } from '@/types';
import { fetchMetadataMarkdown } from '@/utils/metadata';
import { useEffect, useState } from 'react';

const BASE_URL = import.meta.env.VITE_JOURNEY_BASE_URL;

const useJourney = (
  journeyId?: IJourney['id']
): [
  IJourney | undefined,
  boolean,
  (journeyId: IJourney['id']) => Promise<void>,
] => {
  const [isLoading, setIsLoading] = useState(true);
  const [journey, setJourney] = useState<IJourney>();
  const [user] = useUser();

  useEffect(() => {
    if (!journeyId) return void 0;
    loadJourney(journeyId);
  }, []);

  useEffect(() => {
    if (!journey || !user) return void 0;
    const _journey = {
      ...journey,
      progress: user.progress.journeys[journey.id] || 0,
    };
    setJourney(_journey);
  }, [user]);

  useEffect(() => {
    store.setState('exercises', { selectedJourney: journey });
  }, [journey]);

  const loadJourney = async (_journeyId: IJourney['id']) => {
    setIsLoading(true);
    const data = await fetchMetadataMarkdown<IRawJourney>(
      `${BASE_URL}/${_journeyId}`
    );

    const journey: IJourney = {
      id: _journeyId,
      name: data.name,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      progress: user.progress.journeys[data.id] || 0,
      topicCount: 0,
      topics: [],
    };

    setJourney(journey);
    setIsLoading(false);
  };

  return [journey, isLoading, loadJourney];
};

export default useJourney;
