// tslint:disable
export class IAMUser {
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
  relationships_groups_id: number = null;
  role: string;
  email?: string;
  constructor(data: any) {
    this.id = data.id;
    this.type = data.type;
    this.links = data.links.self;
    this.urn = data.attributes.urn;
    this.created_at = data.attributes.created_at;
    this.update_at = data.attributes.created_at;
    this.username = data.attributes.username;
    this.api = data.attributes.api;
    this.console = data.attributes.console;
    this.time_zone = data.attributes.time_zone;
    this.properties = data.attributes.properties;
    this.display_properties = data.attributes.display_properties;
    this.jwt_payload_iss = data.attributes.jwt_payload.iss;
    this.jwt_payload_sub = data.attributes.jwt_payload.sub;
    this.attached_policies = data.attributes.attached_policies;
    this.setGroupId(data);
    this.email = data.attributes.properties.email;
  }

  private setGroupId(data: any): void {
    data && data.relationships && data.relationships.groups && data.relationships.groups.data &&
      data.relationships.groups.data.forEach((item) => {
        this.relationships_groups_id = item ? item.id : null;
      });
  }
}
