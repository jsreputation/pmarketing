import { Injectable } from '@angular/core';
import { TenantHttpService } from '@cl-core/http-services/tenant-http.service';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ClHttpParams } from '@cl-helpers/http-params';
import { TenantHttpAdapterService } from '@cl-core/http-adapters/tenant-http-adapter.service';
import { DefaultSetting, TenantStoreService } from '@cl-core-services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateTimeParser } from '@cl-helpers/date-time-parser';
import { ITimeZone } from '@cl-core/models/settings/time-zone';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private tenant: ITenant;
  constructor(
    private tenantHttpService: TenantHttpService,
    private fb: FormBuilder,
    private tenantStoreService: TenantStoreService
  ) { }

  public findTenant(params: HttpParamsOptions = {}): Observable<ITenant> {
    params = {
      ...params,
      'page[number]': '1',
      'page[size]': '20'
    };
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.tenantHttpService.getTenant(httpParams)
      .pipe(
        map(tenant => {
          return TenantHttpAdapterService.transformToTenant(tenant.data[0]);
        }),
        tap(tenant => this.tenant = tenant)
      );
  }

  public getTenant(): Observable<ITenant> {
    let response;
    if (this.tenant) {
      response = of(this.tenant).pipe(take(1));
    } else {
      response = this.findTenant();
    }
    return response;
  }

  public getSettings(): Observable<ITenantsProperties> {
    return this.getTenant()
      .pipe(
        map(tenant => TenantHttpAdapterService.getTenantsSettings(tenant)),
        tap((tenant) => {
          this.tenantStoreService.tenant = tenant;
        })
      );
  }

  public updateTenant(data: ITenant): Observable<ITenant> {
    const sendData = TenantHttpAdapterService.transformToTenantAPI(data);
    return this.tenantHttpService.patchTenant({ data: sendData }, data.id)
      .pipe(
        map((tenant) => {
          return TenantHttpAdapterService.transformToTenant((tenant.data));
        }),
        tap(tenant => {
          this.tenantStoreService.tenant = TenantHttpAdapterService.getTenantsSettings(tenant);
          this.tenant = tenant;
        })
      );
  }

  public getTimeZone(): Observable<ITimeZone[]> {
    return this.tenantHttpService.getTimeZone()
      .pipe(
        map((zones: ITimeZone[]) => zones.sort(DateTimeParser.compareTimeZone))
      );
  }

  public getCurrency(): Observable<Currency[]> {
    return this.tenantHttpService.getCurrency()
      .pipe(
        map((data: Currency[]) => data.sort((a, b) => {
          const nameA = a.country.toLowerCase();
          const nameB = b.country.toLowerCase();
          return (nameA < nameB) ? -1 : 1;
        }))
      );
  }

  public prepareDefaultValue(data: IBrandingForm): { [key: string]: string } {
    const style = data['theme.style'] ? data['theme.style'] : DefaultSetting.style;
    const font = data['theme.font'] ? data['theme.font'] : DefaultSetting.font;
    const primary = data['theme.primary'] ? data['theme.primary'] : DefaultSetting.primaryColor;
    const accent = data['theme.accent'] ? data['theme.accent'] : DefaultSetting.secondaryColor;
    const headerNavbarColor = data['theme.header_color'] ? data['theme.header_color'] : DefaultSetting.headerNavbarColor;
    const logo = data['theme.logo'] ? data['theme.logo'] : '';
    const title = data['theme.title'] ? data['theme.title'] : '';
    const buttonBgColor = data['theme.button_background_color'] ? data['theme.button_background_color'] : DefaultSetting.buttonBgColor;
    const buttonTextColor = data['theme.button_text_color'] ? data['theme.button_text_color'] : DefaultSetting.buttonTextColor;
    return {
      'theme.style': style,
      'theme.font': font,
      'theme.primary': primary,
      'theme.accent': accent,
      'theme.header_color': headerNavbarColor,
      'theme.logo': logo,
      'theme.title': title,
      'theme.button_background_color': buttonBgColor,
      'theme.button_text_color': buttonTextColor
    };
  }

  public getFormBranding(): FormGroup {
    return this.createFormBranding();
  }

  public prepareTenant(tenant: ITenant, data: IBrandingForm): ITenant {
    return {
      ...tenant,
      ...(TenantHttpAdapterService.transformSettingsBrandingFormToAPI(data) as any as ITenant)
    };
  }

  public prepareDataToBrandingForm(data: ITenant, listColors: any[], listColorsText: any[]): IBrandingForm {
    return TenantHttpAdapterService.transformSettingsBrandingToForm(data, listColors, listColorsText);
  }

  private createFormBranding(): FormGroup {
    return this.fb.group({
      style: [DefaultSetting.style],
      font: [DefaultSetting.font],
      primaryColor: ['#0f69af'],
      secondaryColor: ['#1cd6ff'],
      headerNavbarColor: [null],
      logo: [null, [Validators.required]],
      logoType: ['image'],
      buttonBackgroundColor: [null],
      buttonTextColor: ['#fff']
    });
  }
}
