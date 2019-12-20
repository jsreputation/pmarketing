import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import {
  IWIAMUserAttributes,
  IWTenantDisplayProperties,
  IWCognitoEndpointAttributes,
  IJsonApiItem,
  IJsonApiPostData,
} from '@perx/whistler';
import { IAMUser } from '@cl-core/models/settings/IAMUser.interface';

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

  private static transformToIAMUser(data: IJsonApiItem<IWIAMUserAttributes>): IAMUser {
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
      relationships_groups_id: SettingsHttpAdapter.setGroupId(data),
      // tslint:disable-next-line: deprecation
      email: data.attributes.email || data.attributes.properties.email
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

  // public static transformGeneralSettings(data: any): { time_zone: string, currency: string } {
  //   return {
  //     time_zone: data.timeZone,
  //     currency: data.currency
  //   };
  // }

  public static transformSettingsBrandingFormToAPI(data: IBrandingForm): any {
    return {
      'theme.style': data.style,
      'theme.font': data.font,
      'theme.primary': data.primaryColor,
      'theme.accent': data.secondaryColor,
      'theme.header_color': data.headerNavbarColor.color,
      'theme.logo': data.logoType === 'image' ? data.logo : '',
      'theme.title': data.logoType === 'text' ? data.logo : '',
      'theme.button_background_color': data.buttonBackgroundColor.color,
      'theme.button_text_color': data.buttonTextColor.color
    };
  }

  public static transformSettingsBrandingToForm(data: IWTenantDisplayProperties, listColors: any[], listColorsText: any[]): IBrandingForm {
    const logoType = 'image'; // data['theme.title'] ? 'text' : 'image';
    return {
      style: data['theme.style'],
      font: data['theme.font'],
      primaryColor: data['theme.primary'],
      secondaryColor: data['theme.accent'],
      headerNavbarColor: SettingsHttpAdapter.getColorObj(listColors, data['theme.header_color']), // key
      logo: data['theme.logo'] ? data['theme.logo'] : data['theme.title'],
      logoType,
      buttonBackgroundColor: SettingsHttpAdapter.getColorObj(listColors, data['theme.button_background_color']),
      buttonTextColor: SettingsHttpAdapter.getColorObj(listColorsText, data['theme.button_text_color'])
    };
  }

  private static getColorObj(listColors: IColor[], color: string): IColor {
    const col: IColor = listColors.find(item => item.color === color);
    if (col !== undefined) {
      return col;
    }
    if (listColors.length > 0) {
      return listColors[0];
    }
    return { labelView: 'Primary Color', color: '#ffffff' };
  }

  public static getTenantsSettings(data: any): ITenantsProperties {
    return {
      timeZone: SettingsHttpAdapter.getTenantProperty('time_zone', data),
      color: SettingsHttpAdapter.getTenantProperty('theme.color', data),
      currency: SettingsHttpAdapter.getTenantProperty('currency', data),
      style: SettingsHttpAdapter.getTenantProperty('theme.style', data),
      accent: SettingsHttpAdapter.getTenantProperty('theme.accent', data),
      buttonColor: SettingsHttpAdapter.getTenantProperty('theme.button_background_color', data),
      buttonTextColor: SettingsHttpAdapter.getTenantProperty('theme.button_text_color', data),
      font: SettingsHttpAdapter.getTenantProperty('theme.font', data),
      headerColor: SettingsHttpAdapter.getTenantProperty('theme.header_color', data),
      logo: SettingsHttpAdapter.tenantLogo(data),
      primary: SettingsHttpAdapter.getTenantProperty('theme.primary', data),
      logoType: SettingsHttpAdapter.tenantTypeLogo(data)
    };
  }

  private static getTenantProperty(property: string, data: Tenants): any | null {
    return data && data.display_properties ? data.display_properties[property] : null;
  }

  private static tenantLogo(data: Tenants): string {
    const logo = SettingsHttpAdapter.getTenantProperty('theme.logo', data);
    const title = SettingsHttpAdapter.getTenantProperty('theme.title', data);
    if (title) {
      return title;
    }
    if (logo) {
      return logo;
    }
  }

  /**
   * this method need for get right type of logo img or text in the component
   */
  // @ts-ignore
  private static tenantTypeLogo(data: Tenants): boolean {
    return true; // !(SettingsHttpAdapter.getTenantProperty('theme.title', data) as any);
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
}
