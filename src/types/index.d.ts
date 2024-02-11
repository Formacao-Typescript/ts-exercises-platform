// --- MOCK DATA --- //

export interface IJourney {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  progress?: number;
  topics: ITopic[];
}

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
  progress: IJourney[];
}

// --- MOCK DATA --- //
