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

export interface IWUserJWTRequest {
  identifier: string;
  url: string;
  profile?: IWProfileAttributes;
}

export interface IWCustomProperties {
  gender?: string | null;
  birthday?: string | null;
  race?: string | null;
  country?: string | null;
  nationality?: string | null;
  city?: string | null;
  state?: string | null;
}
