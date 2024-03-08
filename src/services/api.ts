const { VITE_APP_API_URL } = import.meta.env;
const API_URL = VITE_APP_API_URL as string;

export const get = async <T = unknown>(path: string): Promise<T> => {
  const response = await fetch(API_URL + path);
  const { success, data, error } = (await response.json()) as IAPIResponse<T>;

  if (!success) {
    // TODO: show personalized error message
    throw new Error(error!.message);
  }

  return data;
};
