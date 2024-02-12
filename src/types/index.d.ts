export * from './Exercises';

// --- MOCK DATA --- //

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
