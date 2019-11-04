export interface ICognitoUserAttributes {
  'urn': string;
  'created_at': string;
  'updated_at': string;
  'title': string;
  'first_name': string;
  'last_name': string;
  'phone_number': string;
  'email_address': string;
  'primary_identifier': string;
  'properties': null;
}

export interface ICognitoUObject {
  data: InnerDataCognitoUser;
}

export interface InnerDataCognitoUser {
  type: 'users';
  attributes: ICognitoUserAttributes;
}
