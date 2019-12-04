export interface IWProfileAttributes {
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  email_address: string | null;
  primary_identifier: string;
  id?: string;
  urn?: string;
  created_at?: string;
  updated_at?: string;
  type?: string;
  self?: string;
  title?: string | null;
  pools?: any;
  properties?: IWCustomProperties;
  anonymous?: boolean;
}

export interface IWPoolsAttributes {
  name: string;
}

export interface IWCognitoLogin {
  jwt: string;
}

interface IWCustomProperties {
  [key: string]: string | number | boolean;
}

export interface IWUserJWTRequest {
  identifier: string;
  url: string;
  profile?: IWProfileAttributes;
}
