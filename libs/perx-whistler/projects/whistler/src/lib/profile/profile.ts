export interface IWProfileAttributes {
  urn?: string;
  created_at?: string;
  updated_at?: string;
  title: string | null;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  email_address: string | null;
  primary_identifier: string;
  properties?: IWCustomProperties | null;
  anonymous?: boolean;
}

export interface IWPoolsAttributes {
  name: string;
}

export interface IWCognitoLogin {
  jwt: string;
}

export interface IWCustomProperties {
  [key: string]: string | number | boolean;
}

export interface IWUserJWTRequest {
  identifier: string;
  url: string;
  profile?: IWProfileAttributes;
}
