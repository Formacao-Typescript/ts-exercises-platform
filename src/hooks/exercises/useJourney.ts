import { store, STATE_KEY, startLoading } from '@/store/exercises';
import { IJourney, IRawTopic, ITopic } from '@/types';
import { useEffect, useState } from 'react';
import { useExercises } from '..';
const BASE_URL = import.meta.env.VITE_JOURNEY_BASE_URL;

const useJourney = (journeyId?: IJourney['id']) => {
  const { isLoading, journeys } = useExercises();
  const [journey, setJourney] = useState(
    journeys.find(j => j.id === journeyId)
  );

  useEffect(() => {
    if (!journeyId) return void 0;

    // runs only if journey is loaded already
    if (journeys) {
      const journey = journeys.find(j => j.id === journeyId);
      if (!journey) {
        // journey not found
        return void 0;
      }

      loadTopics(journey);
    }
  }, [journeys]);

  if (isLoading) return { journey: null, isLoading: true };

  const loadTopics = async (_journey: IJourney) => {
    startLoading();
    const response = await fetch(`${BASE_URL}/${_journey.id}/metadata.json`);
    const data = (await response.json()) as IRawTopic[];

    const topics: ITopic[] = data.map(rawJourney => {
      return {
        id: rawJourney.id,
        name: rawJourney.name,
        description: rawJourney.description,
        activityCount: rawJourney.activityCount,
        progress: 0, // TODO: get from user state
        activities: [],
      };
    });

    setJourney({ ..._journey, topics });

    // update store removing the old journey from the journeys array and adding this new one
    const newJourneys = journeys.filter(j => j.id !== _journey.id);
    store.setState(STATE_KEY, {
      journeys: [...newJourneys, { ..._journey, topics }],
      isLoading: false,
    });
  };

  return {
    journey,
    isLoading,
    isEmpty: !journey || !journey.topics || journey.topics.length === 0,
    loadTopics,
  };
};

export default useJourney;
