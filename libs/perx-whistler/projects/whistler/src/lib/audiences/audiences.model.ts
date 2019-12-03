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

export interface IWPoolsApi {
  name: string;
}

export interface IWPools {
  [id: string]: { name: string };
}

export interface IWUser {
  id?: string;
  type: string;
  self: string;
  urn?: string;
  created_at?: string;
  updated_at?: string;
  title?: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email_address: string;
  primary_identifier: string;
  pools?: any;
  properties?: IWUserPropertiesFE;
}

export interface IWUserPropertiesFE {
  gender?: string | null;
  birthday?: Date | null;
  race?: string | null;
  country?: string | null;
  nationality?: string | null;
  city?: string | null;
  state?: string | null;
}
