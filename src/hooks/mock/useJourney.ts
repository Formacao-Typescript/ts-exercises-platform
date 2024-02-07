import MOCK_DATA from '@/assets/data.mock';

const useJourney = (id?: string) => {
  if (!id) return null;
  return MOCK_DATA.find(journey => journey.id === id);
};

export default useJourney;
