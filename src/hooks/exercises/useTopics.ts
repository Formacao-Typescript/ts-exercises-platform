import store, { startLoading } from '@/store/exercises';
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

  useEffect(() => {
    if (!topics.length || !user) return void 0;
    const _topics = topics.map(_topic => ({
      ..._topic,
      progress: user.progress.topics[_topic.id] || 0,
    }));
    setTopics(_topics);
  }, [user]);

  useEffect(() => {
    store.setState('exercises', { selectedTopics: topics });
  }, [topics]);

  const loadTopics = async (_journeyId?: IJourney['id']) => {
    startLoading();

    const data = await fetchMetadataJSON<IRawTopic[]>(
      `${BASE_URL}/${_journeyId}`
    );

    const _topics: ITopic[] = data.map(rawTopic => {
      return {
        id: rawTopic.id,
        name: rawTopic.name,
        description: rawTopic.description,
        activityCount: rawTopic.activityCount,
        progress: user.progress.topics[rawTopic.id] || 0,
        activities: [],
      };
    });

    setTopics(_topics);
    setIsLoading(false);
  };

  return [topics, isLoading, loadTopics];
};

export default useTopics;
