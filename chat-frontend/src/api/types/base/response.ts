export interface BasepApiResponse<T> {
  data: T;
  error?: string;
}

export interface PaginationResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
}
