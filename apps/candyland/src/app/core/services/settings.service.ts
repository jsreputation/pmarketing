import { Injectable } from '@angular/core';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';
import { SettingsHttpService } from '@perxtech/whistler-services';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ClHttpParams } from '@cl-helpers/http-params';
import { Role } from '@cl-helpers/role.enum';
import { IReward } from '@perxtech/core';
import { RoleLabelConfig } from '@cl-shared';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ISimpleValue } from '@cl-core/models/simpl-value.interface';
import { HttpParamsOptions } from '@cl-core/models/params-map';
import { IAMGroup } from '@cl-core/models/settings/group.interface';
import { ICognitoEndpoint } from '@cl-core/models/settings/cognito-endpoint.interface';

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
export class SettingsService {

  constructor(
    private settingsHttpService: SettingsHttpService,
    private http: HttpClient
  ) {
  }

  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>('assets/actives/settings/roles.json');
  }

  public getRolesOptions(): Observable<Role[]> {
    return this.http.get<Role[]>('assets/actives/settings/roles-options.json');
  }

  public getAllCredential(data: any): any {
    return this.settingsHttpService.getAllCredential(data);
  }

  public getGroups(params: HttpParamsOptions = {}): Observable<IAMGroup[]> {
    params = {
      ...params,
      'page[number]': '1',
      'page[size]': '20'
    };
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.settingsHttpService.getAllGroups(httpParams)
      .pipe(
        map(groups => groups.data.map((group) => SettingsHttpAdapter.transformToGroup(group))
        ));
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
    return this.http.get<{ [key: string]: RoleLabelConfig }>('assets/actives/role-label/role-label.json');
  }

  public getCognitoEndpoint(id: string, params: HttpParams): Observable<ICognitoEndpoint> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.settingsHttpService.getCognitoEndpoint(id, httpParams).pipe(
      map(response => SettingsHttpAdapter.transformToCognitoEndpoint(response.data))
    );
  }

  public getCognitoEndpoints(params: HttpParamsOptions): Observable<ICognitoEndpoint[]> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.settingsHttpService.getCognitoEndpoints(httpParams).pipe(
      map(
        response => response.data.map(item => SettingsHttpAdapter.transformToCognitoEndpoint(item))
      ));
  }

  public createCognitoEndpoint(data: ICognitoEndpoint = null): Observable<ICognitoEndpoint> {
    const sendData = SettingsHttpAdapter.transformFromCognitoEndpoint(data);
    return this.settingsHttpService.createCognitoEndpoint({ data: sendData }).pipe(
      map(response => SettingsHttpAdapter.transformToCognitoEndpoint(response.data))
    );
  }

  public findAndCreateCognitoEndpoint(): Observable<ICognitoEndpoint> {
    const params: HttpParamsOptions = { 'page[number]': '1', 'page[size]': '1' };
    return this.getCognitoEndpoints(params).pipe(
      switchMap(data => {
        if (data && data.length > 0) {
          return of(data[0]);
        }
        return this.createCognitoEndpoint();
      })
    );
  }
}
