export class SettingsHttpAdapter {

  // tslint:disable
  public static transformInviteUser(data: any): any {
    const res = {
      type: 'users',
      attributes: {
        username: data.name,
        api: true,
        console: true,
        properties: {
          email: data.email
        }
      },
      relationships: {
        groups: {
          data: [{id: data.groups.id, type: data.groups.type}]
        }
      }
    };
    if (data.id) {
      res['id'] = data.id;
    }
    return res;
  }

  public static transformToIAMUser(data: any): IAMUser {
    return {
      id: data.id,
      type: data.type,
      links: data.links.self,
      urn: data.attributes.urn,
      created_at: data.attributes.created_at,
      update_at: data.attributes.created_at,
      username: data.attributes.username,
      api: data.attributes.api,
      console: data.attributes.console,
      time_zone: data.attributes.time_zone,
      properties: data.attributes.properties,
      display_properties: data.attributes.display_properties,
      jwt_payload_iss: data.attributes.jwt_payload.iss,
      jwt_payload_sub: data.attributes.jwt_payload.sub,
      attached_policies: data.attributes.attached_policies,
      relationships_groups_id: this.setGroupId(data),
      email: data.attributes.properties.email
    };
  }

  public static transformToTableData(data: any): ITableData<IAMUser> {
    const formatData = data.data.map((item) => {
      const user = SettingsHttpAdapter.transformToIAMUser(item);
      if (data.included && data.included.length) {
        for (let i = 0; i <= data.included.length - 1; i++) {
          if (user.relationships_groups_id === data.included[i].id) {
            user.role = data.included[i].attributes.name;
            break;
          }
        }
      }
      return user;
    });
    return { data: formatData, meta: data.meta}
  }

  private static setGroupId(data: any): number | null {
    let relationships_groups_id = null;
    data && data.relationships && data.relationships.groups && data.relationships.groups.data &&
    data.relationships.groups.data.forEach((item) => {
      relationships_groups_id = item ? item.id : null;
    });
    return relationships_groups_id;
  }
}
