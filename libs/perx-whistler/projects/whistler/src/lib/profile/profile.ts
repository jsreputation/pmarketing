export interface IWProfileAttributes {
  urn?: string;
  created_at?: string;
  updated_at?: string;
  title: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  email_address: string | null;
  primary_identifier: string;
  properties?: string | {} | null;
}

export interface IPoolsAttributes {
  name: string;
}
