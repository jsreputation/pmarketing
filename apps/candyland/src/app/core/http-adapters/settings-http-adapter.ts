import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';

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
          data: [{id: data.roleId, type: "groups"}]
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

  public static transformGeneralSettings(data: any): any {
    return {
      'time_zone': data.timeZone,
      currency: data.currency
    };
  }

  public static transformSettingsBrandingFormToAPI (data: any): any {
    return {
      'theme.style': data.style,
      'theme.font': data.font,
      'theme.primary': data.primaryColor,
      'theme.accent': data.secondaryColor,
      'theme.header_color': data.headerNavbarColor.color,
      'theme.logo': data.logoType === 'image' ? data.logo : '',
      'theme.title': data.logoType === 'text' ? data.logo : '',
      'theme.button_background_color': data.button_background_color,
      'theme.button_text_color': data.button_text_color
    };
  }

  public static transformSettingsBrandingToForm (data: any, listColors: any[], listColorsText: any[]): IBrandingForm {
    const logoType = data['theme.title'] ? 'text' : 'image';
    return {
      style: data['theme.style'],
      font: data['theme.font'],
      primaryColor: data['theme.primary'],
      secondaryColor: data['theme.accent'],
      headerNavbarColor: SettingsHttpAdapter.getColorObj(listColors, data['theme.header_color']), // key
      logo: data['theme.logo'] ? data['theme.logo'] : data['theme.title'],
      logoType: logoType,
      buttonBackgroundColor: SettingsHttpAdapter.getColorObj(listColors, data['theme.button_background_color']), // key, just changed here
      buttonTextColor: SettingsHttpAdapter.getColorObjText(listColorsText, data['theme.button_text_color'])
    }
  }

  public static getColorObj(listColors: any[], color: string): {labelView: string, color: string} {
    return listColors.find(item => item.color === color);
  }

  public static getColorObjText(listColorsText: any[], color: string): {labelView: string, color: string} {
    return listColorsText.find(item => item.color === color);
  }

  public static getTenantsSettings(data):ITenantsProperties {
    return {
      timeZone: SettingsHttpAdapter.getTenantProperty('time_zone', data),
      color: SettingsHttpAdapter.getTenantProperty('theme.color', data),
      currency: SettingsHttpAdapter.getTenantProperty('currency', data),
      style: SettingsHttpAdapter.getTenantProperty('theme.style', data),
      accent: SettingsHttpAdapter.getTenantProperty('theme.accent', data),
      buttonColor: SettingsHttpAdapter.getTenantProperty('theme.button_background_color', data), // change
      buttonTextColor: SettingsHttpAdapter.getTenantProperty('theme.button_text_color', data), // change
      font: SettingsHttpAdapter.getTenantProperty('theme.font', data),
      headerColor: SettingsHttpAdapter.getTenantProperty('theme.header_color', data),
      logo: SettingsHttpAdapter.tenantLogo(data),
      primary: SettingsHttpAdapter.getTenantProperty('theme.primary', data),
      logoType: SettingsHttpAdapter.tenantTypeLogo(data),
    }
  }

  public static getTenantProperty(property: string, data: Tenants): any {
    return data && data.display_properties  ? data.display_properties[property] : null;
  }

  public static tenantLogo(data: Tenants): any {
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
  public static tenantTypeLogo(data: Tenants): boolean {
    return !(SettingsHttpAdapter.getTenantProperty('theme.title', data) as any);
  }
}
