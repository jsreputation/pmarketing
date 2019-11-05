export interface IAudiencesUserForm {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  birthday: Date;
  race: string;
  country: string;
  nationality: string;
  city: string;
  state: string;
  audienceList: string[];
  file: string;
}

export interface IAudiences {
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

export interface IPoolsApi {
  name: string;
}

export interface IPools {
  [id: string]: { name: string };
}

export interface IUserApi {
  urn?: string;
  created_at?: string;
  updated_at?: string;
  title?: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email_address: string;
  primary_identifier: string;
  properties?: {};
}

export interface IUser {
  id: string;
  type: string;
  self: string;
  urn: string;
  created_at: string;
  updated_at: string;
  title: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email_address: string;
  primary_identifier: string;
  pools?: any;
}
