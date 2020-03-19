import {
  IWIAMUserAttributes,
  IJsonApiItem,
  IJsonApiPostData
} from '@perxtech/whistler';
import { IAMUser } from '@cl-core/models/settings/IAMUser.interface';
import { ITableData } from '@cl-core/models/data-list.interface';

export class IamUserHttpAdapter {
  public static transformInviteUser(data: IAMUser): IJsonApiPostData<IWIAMUserAttributes> {
    return {
      type: 'users',
      attributes: {
        username: data.name,
        api: true,
        console: true,
        email: data.email || null
      },
      relationships: {
        groups: {
          data: [{ id: data.roleId, type: 'groups' }]
        }
      }
    };
  }

  public static transformToIAMUser(data: IJsonApiItem<IWIAMUserAttributes>): IAMUser {
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
      relationships_groups_id: IamUserHttpAdapter.setGroupId(data),
      // tslint:disable-next-line: deprecation
      email: data.attributes.email || data.attributes.properties.email
    };
  }

  public static transformToUsers(data: any): IAMUser[] {
    return data.data.map((item) => {
      const user = IamUserHttpAdapter.transformToIAMUser(item);
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
  }

  public static transformToTableData(data: any): ITableData<IAMUser> {
    const formatData = IamUserHttpAdapter.transformToUsers(data);
    return { data: formatData, meta: data.meta };
  }

  private static setGroupId(data: any): number | null {
    let relationshipsGroupsId = null;
    if (data && data.relationships && data.relationships.groups && data.relationships.groups.data) {
      data.relationships.groups.data.forEach((item) => {
        relationshipsGroupsId = item ? item.id : null;
      });
    }
    return relationshipsGroupsId;
  }
}
