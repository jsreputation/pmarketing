export interface IWProfileAttributes {
  urn?: string;
  created_at?: string;
  updated_at?: string;
  title?: string | null;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  email_address: string | null;
  primary_identifier?: string | null;
  properties?: IWCustomProperties | null;
  anonymous?: boolean;
  birthday?: string | null;
  gender?: string;
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
  /** @deprecated */
  gender?: string | null;
  /** @deprecated */
  birthday?: string | null;
  race?: string | null;
  country?: string | null;
  nationality?: string | null;
  city?: string | null;
  state?: string | null;
}
