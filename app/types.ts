export interface RawgListResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
