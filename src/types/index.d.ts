export * from './Exercises';

// --- MOCK DATA --- //

export interface ITopic {
  id: string;
  name: string;
  description: string;
  activities: IActivity[];
}

export interface IActivity {
  id: string;
  name: string;
  description: string;
  source: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  progress: {
    journeys: Record<IJourney[id], number>;
    topics: Record<ITopic[id], number>;
    activities: IActivity[id][];
  };
}

// --- MOCK DATA --- //
