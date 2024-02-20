import { startLoading } from '@/store/exercises';
import { useUser } from '@/store/user';
import { IJourney, IRawTopic, ITopic } from '@/types';
import { useEffect, useState } from 'react';
import { fetchMetadataJSON } from '@/utils/metadata';

const BASE_URL = import.meta.env.VITE_JOURNEY_BASE_URL;

const useTopics = (
  journeyId?: IJourney['id']
): [ITopic[], boolean, () => Promise<void>] => {
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [user] = useUser();

  useEffect(() => {
    if (!journeyId) return void 0;

    loadTopics(journeyId);
  }, []);

  const loadTopics = async (_journeyId?: IJourney['id']) => {
    startLoading();

    const data = await fetchMetadataJSON<IRawTopic[]>(
      `${BASE_URL}/${_journeyId}`
    );

    const _topics: ITopic[] = data.map(rawJourney => {
      return {
        id: rawJourney.id,
        name: rawJourney.name,
        description: rawJourney.description,
        activityCount: rawJourney.activityCount,
        progress: user.progress.topics[rawJourney.id] || 0,
        activities: [],
      };
    });

    setTopics(_topics);
    setIsLoading(false);
  };

  return [topics, isLoading, loadTopics];
};

export default useTopics;
