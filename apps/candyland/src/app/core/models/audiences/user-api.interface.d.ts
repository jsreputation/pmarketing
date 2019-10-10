declare interface IUserApi {
  urn?: string;
  created_at?: string;
  updated_at?: string;
  title?: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email_address: string;
  primary_identifier: string;
  properties: {};
}

declare interface IUserAttributes {
  title: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email_address: string;
  primary_identifier: string;
}

declare interface IUserSendToTransform {
    type: string;
    attributes: IUserAttributes
    relationships?: { pools: {data: string[]}}
}
