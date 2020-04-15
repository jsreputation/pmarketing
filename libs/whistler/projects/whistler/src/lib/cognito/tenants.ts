import { IWSurveyDisplayProperties } from '../engagement/survey';

export interface IWCognitoTenantAttributes {
  properties: {
    signup: IWSurveyDisplayProperties;
  };
}

export interface IWCognitoEndpointAttributes {
  url: string;
  target_type: string;
  properties?: any;
  target_id?: number | null;
}
