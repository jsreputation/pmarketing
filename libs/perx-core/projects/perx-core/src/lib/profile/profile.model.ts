export interface IProfile {
  id: number;
  identifier?: string;
  state?: string; // changed to optional cz whistler api dn have
  firstName: string;
  lastName: string;
  middleName?: string;
  phone?: string;
  email?: string;
  birthDate?: Date;
  gender?: string;
  joinedDate?: string;
  passwordExpiryDate?: string;
  customProperties?: ICustomProperties;
}

export interface ICustomProperties {
  [key: string]: string | number | boolean;
}

export interface IProfileProperty {
  state?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  birthDate?: Date;
  gender?: string;
}

export interface ICardNumber {
  card_number: number;
  loyalty_program_id: number;
}

// todo remoev and reuse/leverage IProfileProperty
export interface IProfileAttributes {
  urn?: string;
  created_at?: string;
  updated_at?: string;
  title: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  email_address: string | null;
  primary_identifier: string;
  properties?: string | null;
}
