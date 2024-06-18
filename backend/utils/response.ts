// response standardization
export interface IJSONSuccessResponse<T = unknown> {
  success: true;
  response: T;
}

export interface IJSONFailureResponse {
  success: false;
  message: string | Record<string, unknown>;
}

export function JSONSuccessResponse<T = unknown>(
  data: T
): IJSONSuccessResponse<T> {
  return {
    success: true,
    response: data ?? ({} as T),
  };
}

export function JSONFailureResponse(
  message: string | Record<string, unknown>
): IJSONFailureResponse {
  return {
    success: false,
    message,
  };
}
