// response standardization
export interface IJSONSuccessResponse<T = any> {
  success: boolean;
  data: T;
}

export interface IJSONFailureResponse {
  success: boolean;
  message: string;
}

export function JSONSuccessResponse<T = any>(data: T): IJSONSuccessResponse<T> {
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
