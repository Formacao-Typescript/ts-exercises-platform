export interface IExercisesStoreState {
  isLoading: boolean;
  journeys: IJourney[];
  selectedJourney: IJourney | null;
  selectedTopics: ITopic[];
  activities: IActivity[];
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

export interface IRawTopic {
  id: string;
  name: string;
  description: string;
  activityCount: number;
}

export interface ITopic {
  id: string;
  name: string;
  description: string;
  activityCount: number;
  progress: number;
  activities: IActivity[];
}

export interface IRawActivity {
  id: string;
  name: string;
  description: string;
}

export interface IActivity {
  id: string;
  name: string;
  description: string;
  source: string;
}

export interface IActivityIdentifier {
  journeyId: IJourney['id'];
  topicId: ITopic['id'];
  activityId: IActivity['id'];
}
