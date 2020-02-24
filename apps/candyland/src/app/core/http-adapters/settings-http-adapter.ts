import {
  IWIAMUserAttributes,
  IWCognitoEndpointAttributes,
  IJsonApiItem,
  IJsonApiPostData,
} from '@perx/whistler';
import { IAMUser } from '@cl-core/models/settings/IAMUser.interface';
import { ICognitoEndpoint } from '@cl-core/models/settings/cognito-endpoint.interface';
import { IAMGroup } from '@cl-core/models/settings/group.interface';

export interface IColor {
  labelView: string;
  color: string;
}

export class SettingsHttpAdapter {
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

  public static transformToCognitoEndpoint(data: IJsonApiItem<IWCognitoEndpointAttributes>): ICognitoEndpoint {
    return {
      url: data.attributes.url || '',
      targetType: data.attributes.target_type,
      targetId: data.attributes.target_id
    };
  }

  public static transformFromCognitoEndpoint(data: ICognitoEndpoint): IJsonApiPostData<IWCognitoEndpointAttributes> {
    return {
      type: 'endpoints',
      attributes: {
        url: data.url || 'https://generic-blackcomb-dev1.uat.whistler.perxtech.io/',
        target_type: data.targetType || 'blackcomb',
      }
    };
  }

  public static transformToGroup(data: any): IAMGroup {
    return {
      id: data.id,
      type: data.type,
      name: data.attributes.name,
      createdAt: data.attributes.careatd_at,
      updatedAt: data.attributes.updated_at
    };
  }
}
