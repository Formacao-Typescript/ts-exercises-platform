export type IAPIResponse<T = unknown> =
  | {
      success: true;
      response: T;
    }
  | {
      success: false;
      message: string;
    };
