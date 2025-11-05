export interface ErrorResponse {
  success: boolean;
  error: {
    code: number;
    type: string;
    info: string;
  };
}
