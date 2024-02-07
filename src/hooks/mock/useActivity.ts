import { ITopic } from '@/types';

const useActivity = (topic?: ITopic, activityId?: string) => {
  if (!activityId || !topic) return null;

  return topic.activities.find(activity => activity.id === activityId);
};

export default useActivity;
