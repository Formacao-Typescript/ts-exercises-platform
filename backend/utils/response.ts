// response standardization
export interface IJSONSuccessResponse<T = unknown> {
  success: boolean;
  data: T;
}

export interface IJSONFailureResponse {
  success: boolean;
  message: string;
}

export function JSONSuccessResponse<T = unknown>(
  data: T
): IJSONSuccessResponse<T> {
  return {
    success: true,
    data,
  };
}

export function JSONFailureResponse(message: string): IJSONFailureResponse {
  return {
    success: false,
    message,
  };
}
