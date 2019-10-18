import { ICustomProperties } from '@perx/core';

export interface IWhistlerProfileAttributes {
  urn: string;
  created_at: string;
  updated_at: string;
  title: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  email_address: string | null;
  primary_identifier: string;
  properties?: ICustomProperties | null;
}
