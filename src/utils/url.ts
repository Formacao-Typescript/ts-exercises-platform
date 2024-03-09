export const buildUrl = (path: string, params: Record<string, string> = {}) => {
  const bakedParams = new URLSearchParams(params).toString();
  return `${path}?${bakedParams}`;
};
