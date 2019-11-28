import { Injectable } from '@angular/core';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';
import { SettingsHttpService } from '@cl-core/http-services/settings-http.service';
import { AuthService } from '@cl-core/services/auth.service';
import { DateTimeParser } from '@cl-helpers/date-time-parser';
import Utils from '@cl-helpers/utils';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { DataStore } from '@cl-core/http-adapters/datastore';
import { Groups } from '@cl-core/http-adapters/iam-groups';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { ClHttpParams } from '@cl-helpers/http-params';
import { Role } from '@cl-helpers/role.enum';
import { IamUser } from '@cl-core/http-adapters/iam-user';
import { IWIAMUserAttributes } from '@perx/whistler';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { IReward } from '@perx/core';
import { RoleLabelConfig } from '@cl-shared';

export enum DefaultSetting {
  style = 'Light',
  font = 'Roboto',
  primaryColor = '#0f69af',
  secondaryColor = '#1cd6ff',
  headerColor = '#0f69af',
  logoType = 'image',
  buttonBgColor = '#0f69af',
  headerNavbarColor = '#0f69af',
  buttonTextColor = '#fff'
}

export const settingsStyles: ISimpleValue[] = [{
  id: 1, value: 'Light'
}, {
  id: 2, value: 'Dark'
}];
export const settingsFonts: ISimpleValue[] = [{
  id: 1, value: 'Roboto'
}, {
  id: 2, value: 'Lato'
}];

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements ITableService {
  private tenants: Tenants;

  constructor(
    private settingsHttpService: SettingsHttpService,
    private fb: FormBuilder,
    private authService: AuthService,
    private dataStore: DataStore
  ) {
  }

  public getTimeZone(): Observable<ITimeZone[]> {
    return this.settingsHttpService.getTimeZone()
      .pipe(
        map((zones: ITimeZone[]) => zones.sort(DateTimeParser.compareTimeZone))
      );
  }

  public getCurrency(): Observable<Currency[]> {
    return this.settingsHttpService.getCurrency()
      .pipe(
        map((data: Currency[]) => data.sort((a, b) => {
          const nameA = a.country.toLowerCase();
          const nameB = b.country.toLowerCase();
          return (nameA < nameB) ? -1 : 1;
        }))
      );
  }

  public getRoles(): Observable<Role[]> {
    return this.settingsHttpService.getRoles();
  }

  public getRolesOptions(): Observable<Role[]> {
    return this.settingsHttpService.getRolesOptions();
  }

  public getFormBranding(): FormGroup {
    return this.createFormBranding();
  }

  public getAllCredential(data: any): any {
    return this.settingsHttpService.getAllCredential(data);
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

  public getTableData(params: HttpParamsOptions): Observable<ITableData<IAMUser>> {
    params.include = 'groups';
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.settingsHttpService.getAllIMAUsers(httpParams)
      .pipe(
        map(res => SettingsHttpAdapter.transformToTableData(res))
      );
  }

  public inviteNewUser(newUser: IAMUser): Observable<IJsonApiPayload<IWIAMUserAttributes>> {
    const formattedNewUser = SettingsHttpAdapter.transformInviteUser(newUser);
    return this.settingsHttpService.inviteNewUser(formattedNewUser);
  }

  public patchUser(currentUser: IAMUser, updatedUser: IAMUser): Observable<IJsonApiPayload<IWIAMUserAttributes>> {
    const id = currentUser.id;
    const userChanges = Utils.nestedObjectAssign(currentUser, updatedUser);
    const formattedUserChanges = SettingsHttpAdapter.transformInviteUser(userChanges);
    return this.settingsHttpService.patchUser(id, formattedUserChanges);
  }

  public deleteUser(id: string): Observable<IJsonApiPayload<IWIAMUserAttributes>> {
    return this.settingsHttpService.deleteUser(id);
  }

  public getAllGroups(): Observable<JsonApiQueryData<Groups>> {
    return this.dataStore.findAll(Groups, { page: { size: 10, number: 1 } });
  }

  public getTenants(): Observable<Tenants> {
    return this.dataStore.findAll(Tenants, { page: { size: 10, number: 1 } })
      .pipe(
        map(tenants => tenants.getModels()[0]),
        tap(tenant => this.tenants = tenant)
      );
  }

  public getTenantsSettings(): Observable<ITenantsProperties> {
    return this.dataStore.findAll(Tenants, { page: { size: 10, number: 1 } })
      .pipe(
        map(response => SettingsHttpAdapter.getTenantsSettings(response))
      );
  }

  public updateTenants(value: ITenantsProperties): Observable<IamUser> {
    const newProperties = {...this.tenants.display_properties, ...value};
    this.tenants.display_properties = {...newProperties};
    return this.tenants.save().pipe(
      switchMap(() => this.authService.updateUser())
    );
  }

  public getMockReward(): IReward {
    return {
      id: 1,
      name: 'Starbucks venti $5',
      subtitle: 'So yummy',
      description: 'One bought, one offered',
      validFrom: null,
      validTo: null,
      rewardThumbnail: 'https://picsum.photos/300/300',
      rewardBanner: 'https://picsum.photos/200/300',
      merchantImg: 'https://picsum.photos/200/300',
      termsAndConditions: '',
      howToRedeem: '',
      rewardPrice: [{
        id: 23,
        currencyCode: '44',
        price: 3
      }],
      categoryTags: [{
        id: 34,
        title: 'Lifestyle',
        parent: null
      }]
    };
  }

  public getRoleLabel(): Observable<{ [key: string]: RoleLabelConfig }> {
    return this.settingsHttpService.getRoleLabel();
  }

}
