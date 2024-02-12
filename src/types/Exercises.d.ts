export interface IExercisesStoreState {
  isLoading: boolean;
  journeys: IJourney[];
  selectedJourney: IJourney | null;
}

export interface IRawJourney {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  topicCount: number;
}

export interface IJourney {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  topicCount: number;
  progress: number;
  topics: ITopic[];
}
