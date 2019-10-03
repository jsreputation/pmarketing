// tslint:disable
declare interface IAMUser {
  id: string;
  type: string;
  links: string;
  urn: string;
  created_at: string;
  update_at: string;
  username: string;
  api: boolean;
  console: boolean;
  time_zone: string;
  properties: any;
  display_properties: any;
  jwt_payload_iss: string;
  jwt_payload_sub: string;
  attached_policies: {
    AdministratorAccess: number
  };
  relationships_groups_id: number | null;
  role?: string;
  email?: string;
}
