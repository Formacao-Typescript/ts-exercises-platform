export interface IAPIResponse<T = unknown> {
  success: boolean;
  data: T;
  error?: { message: string };
}
