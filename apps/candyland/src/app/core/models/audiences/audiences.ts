export interface IAudience {
  id: number | string;
  updated_at: string;
  name: string;
  users_count: number;
}
export interface IPools {
  [id: string]: string;
}
