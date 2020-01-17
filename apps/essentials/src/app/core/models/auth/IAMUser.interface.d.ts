export interface IAMUser {
  id: string;
  type: string;
  links: string | undefined;
  urn: string | undefined;
  created_at: string | undefined;
  update_at: string | undefined;
  username: string;
  api: boolean;
  console: boolean;
  time_zone: string | undefined;
  properties: any;
  display_properties: any;
  jwt_payload_iss: string | undefined;
  jwt_payload_sub: string | undefined;
  attached_policies: {
    AdministratorAccess: number
  } | undefined;
  relationships_groups_id: number | null;
  role?: string;
  roleId?: string;
  email?: string;
}
