export interface MessageResponse {
  message: string;
}

export interface ErrorResponse {
  message: string;
  code: string;
  errors?: { field: string; errors: string[] }[];
}
