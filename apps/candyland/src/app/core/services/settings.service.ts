import { Injectable } from '@angular/core';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';
import { SettingsHttpService } from '@cl-core/http-services/settings-http.service';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ClHttpParams } from '@cl-helpers/http-params';
import { Role } from '@cl-helpers/role.enum';
import { IReward } from '@perx/core';
import { RoleLabelConfig } from '@cl-shared';
import { HttpParams } from '@angular/common/http';

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
  ) {
  }

  public getRoles(): Observable<Role[]> {
    return this.settingsHttpService.getRoles();
  }

  public getRolesOptions(): Observable<Role[]> {
    return this.settingsHttpService.getRolesOptions();
  }

  public getAllCredential(data: any): any {
    return this.settingsHttpService.getAllCredential(data);
  }

  public getGroups(params: HttpParamsOptions = {}): Observable<any> {
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
    return this.settingsHttpService.getRoleLabel();
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
