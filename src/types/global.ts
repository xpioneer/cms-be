export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  next?: number;
  prev?: number;
}

export interface ResponseData<T> {
  status: number
  data: T
  msg: string
}