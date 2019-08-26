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

const test = {
  id: '1',
  type: 'users',
  links: {self: 'http://api.whistler.perxtech.org/iam/users/1'},
  attributes: {
    urn: 'urn:perx:iam::222222222:user/Admin_2',
    created_at: '2019-08-19T12:31:10.350Z',
    updated_at: '2019-08-19T12:31:10.659Z',
    username: 'Admin_2',
    api: true,
    console: true,
    time_zone: 'Asia/Singapore',
    properties: {},
    display_properties: {},
    jwt_payload: {iss: 'http://iam', sub: 'urn:perx:iam::222222222:user/Admin_2', scope: '*'},
    attached_policies: {AdministratorAccess: 1},
    attached_actions: {}
  },
  relationships: {
    groups: {
      links: {
        self: 'http://api.whistler.perxtech.org/iam/users/1/relationships/groups',
        related: 'http://api.whistler.perxtech.org/iam/users/1/groups'
      }
    },
    credentials: {
      links: {
        self: 'http://api.whistler.perxtech.org/iam/users/1/relationships/credentials',
        related: 'http://api.whistler.perxtech.org/iam/users/1/credentials'
      }
    }
  }
};

console.log(test);
