import MOCK_DATA from '@/assets/data.mock';
import { ITopic } from '@/types';

const useTopic = (journeyId?: string, topicId?: string): ITopic | undefined => {
  if (!journeyId || !topicId) return undefined;
  const journey = MOCK_DATA.find(journey => journey.id === journeyId);

  if (!journey) return undefined;
  return journey.topics.find(topic => topic.id === topicId);
};

export default useTopic;
