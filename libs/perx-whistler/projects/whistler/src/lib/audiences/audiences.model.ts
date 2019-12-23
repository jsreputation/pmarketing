export interface IWAudiences {
  urn: string;
  created_at: string;
  updated_at: string;
  name: string;
  properties: string;
  user_count?: number;
  system_generated?: boolean;
}

export interface IWPools {
  [id: string]: { name: string };
}
