export interface IWIAMUserAttributes {
  id?: string;
  urn?: string;
  created_at?: string;
  update_at?: string;
  username: string;
  api: boolean;
  console: boolean;
  time_zone?: string;
  properties?: {
    /** @deprecated use the direct email field instead, not in properties */
    email?: string;
  };
  display_properties?: void;
  email: string | null;
  jwt_payload?: {
    iss?: string;
    sub?: string;
  };
  attached_policies?: {
    AdministratorAccess: number
  };
  attached_actions?: {};
}
