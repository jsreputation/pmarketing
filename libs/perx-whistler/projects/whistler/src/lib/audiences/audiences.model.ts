export interface IWAudiences {
  id: number;
  type: string;
  self: string;
  urn: string;
  created_at: string;
  updated_at: string;
  name: string;
  properties: string;
  users: any;
}

export interface IWPools {
  [id: string]: { name: string };
}
