import { Injectable } from '@angular/core';
import { IColor } from '@cl-core/http-adapters/settings-http-adapter';
import { IJsonApiItem, IWSetting, IWTenant } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class TenantHttpAdapterService {
  /* need add type to data*/
  public static transformToTenant(data: IJsonApiItem<IWTenant>): ITenant {
    return {
      id: data.id,
      name: data.attributes.name,
      time_zone: TenantHttpAdapterService.getTenantProperty('time_zone', data),
      'theme.color': TenantHttpAdapterService.getTenantProperty('theme.color', data),
      currency: TenantHttpAdapterService.getTenantProperty('currency', data),
      'theme.style': TenantHttpAdapterService.getTenantProperty('theme.style', data),
      'theme.accent': TenantHttpAdapterService.getTenantProperty('theme.accent', data),
      'theme.button_background_color': TenantHttpAdapterService.getTenantProperty('theme.button_background_color', data),
      'theme.button_text_color': TenantHttpAdapterService.getTenantProperty('theme.button_text_color', data),
      'theme.font': TenantHttpAdapterService.getTenantProperty('theme.font', data),
      'theme.header_color': TenantHttpAdapterService.getTenantProperty('theme.header_color', data),
      'theme.logo': TenantHttpAdapterService.tenantLogo(data),
      'theme.primary': TenantHttpAdapterService.getTenantProperty('theme.primary', data),
      'theme.title': TenantHttpAdapterService.tenantTypeLogo(data),
      account: TenantHttpAdapterService.getTenantProperty('account', data),
      campaign_base_url: TenantHttpAdapterService.getTenantProperty('campaign_base_url', data)
    };
  }
/* need add type to data*/
  private static getTenantProperty(property: string, data: IJsonApiItem<IWTenant>): any | null {
    return data && data.attributes.display_properties ? data.attributes.display_properties[property] : null;
  }

  public static transformToTenantAPI(data: ITenant): IJsonApiItem<IWTenant> {
    return {
      type: 'tenants',
      id: data.id,
      attributes: {
        name: data.name,
        display_properties: {
          time_zone: data.time_zone,
          'theme.color': data['theme.color'],
          currency: data.currency,
          'theme.style': data['theme.style'],
          'theme.accent': data['theme.accent'],
          'theme.button_text_color': data['theme.button_text_color'],
          'theme.button_background_color': data['theme.button_background_color'],
          'theme.font': data['theme.font'],
          'theme.header_color': data['theme.header_color'],
          'theme.logo': data['theme.logo'],
          'theme.primary': data['theme.primary'],
          account: data.account,
          campaign_base_url: data.campaign_base_url
        }
      }
    };
  }

  public static getTenantsSettings(data: any): ITenantsProperties {
    return {
      timeZone: data.time_zone,
      color: data['theme.color'],
      currency: data['currency'],
      style: data['theme.style'],
      accent: data['theme.accent'],
      buttonColor: data['theme.button_background_color'],
      buttonTextColor: data['theme.button_text_color'],
      font: data['theme.font'],
      headerColor: data['theme.header_color'],
      logo: data['theme.logo'],
      primary: data['theme.primary'],
      logoType: true
    };
  }

  private static tenantLogo(data: IJsonApiItem<IWTenant>): string {
    const logo = TenantHttpAdapterService.getTenantProperty('theme.logo', data);
    const title = TenantHttpAdapterService.getTenantProperty('theme.title', data);
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
  private static tenantTypeLogo(data: IJsonApiItem<IWTenant>): boolean {
    return true; // !(TenantHttpAdapterService.getTenantProperty('theme.title', data) as any);
  }

  public static transformSettingsBrandingFormToAPI(data: IBrandingForm): Partial<IWSetting> {
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

  public static transformSettingsBrandingToForm(data: ITenant, listColors: any[], listColorsText: any[]): IBrandingForm {
    const logoType = 'image'; // data['theme.title'] ? 'text' : 'image';
    return {
      style: data['theme.style'],
      font: data['theme.font'],
      primaryColor: data['theme.primary'],
      secondaryColor: data['theme.accent'],
      headerNavbarColor: TenantHttpAdapterService.getColorObj(listColors, data['theme.header_color']), // key
      logo: data['theme.logo'] ? data['theme.logo'] : null,
      logoType,
      buttonBackgroundColor: TenantHttpAdapterService.getColorObj(listColors, data['theme.button_background_color']),
      buttonTextColor: TenantHttpAdapterService.getColorObj(listColorsText, data['theme.button_text_color'])
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
}
