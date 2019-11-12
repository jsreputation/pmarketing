export interface IWIAMUserAttributes {
  id?: string;
  urn?: string;
  created_at?: string;
  update_at?: string;
  username: string;
  api: boolean;
  console: boolean;
  time_zone?: string;
  properties?: any;
  display_properties?: any;
  jwt_payload?: {
    iss?: string;
    sub?: string;
  };
  attached_policies?: {
    AdministratorAccess: number
  };
  attached_actions?: {};
}
