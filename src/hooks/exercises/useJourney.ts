import { useUser } from '@/store/user';
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

  const loadJourney = async (_journeyId: IJourney['id']) => {
    setIsLoading(true);
    const data = await fetchMetadataMarkdown<IRawJourney>(BASE_URL);

    const journey: IJourney = {
      id: data.id,
      name: data.name,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      topicCount: data.topicCount,
      progress: user.progress.journeys[data.id] || 0,
      topics: [],
    };

    setJourney(journey);
    setIsLoading(false);
  };

  return [journey, isLoading, loadJourney];
};

export default useJourney;
