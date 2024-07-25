import { IAPIResponse } from '@/types';

const { VITE_APP_API_URL } = import.meta.env;
const API_URL = VITE_APP_API_URL as string;

const _handle = <T = unknown>(data: IAPIResponse<T>): [string?, T?] => {
  if (!data.success) {
    // TODO: show personalized error message
    return [data.message];
  }

  return [undefined, data.response];
};

export const get = async <T = unknown>(
  path: string
): Promise<[string?, T?]> => {
  const res = await fetch(API_URL + path);
  const data = (await res.json()) as IAPIResponse<T>;

  return _handle(data);
};

export const post = async <T = unknown>(
  path: string,
  body: string
): Promise<[string?, T?]> => {
  const response = await fetch(API_URL + path, {
    method: 'POST',
    body,
  });
  const data = (await response.json()) as IAPIResponse<T>;

  return _handle(data);
};
