import { Observable, of } from 'rxjs';
import { IReward } from '@perx/core';
import { RoleLabelConfig } from '@cl-shared';
import { HttpParams } from '@angular/common/http';

export class MockSettingsService {
  public getRoles(): Observable<any[]> {
    return of([  {
      id: 0,
      avatar: null,
      firstName: 'Beck',
      lastName: 'Burke',
      email: 'beckburke@netropic.com',
      gender: 'male',
      invitedDate: '2018-11-24 04:56:56',
      role: 'creator'
    }]);
  }

  public getMockCognitoEndpoint(): ICognitoEndpoint {
    return {
      url: 'https://test.com',
      targetType: 'test'
    };
  }

  public getRolesOptions(): Observable<any[]> {
    return of([{
      title: 'ROLE_TYPES.ADMIN_TITLE',
      value: 'Administrators',
      id: 1,
      description: 'ROLE_TYPES.ADMIN_DESCRIPTION'
    }]);
  }

  public getAllCredential(data: any): any {
    return of(data);
  }

  public getAllGroups(): Observable<IAMGroup[]> {
    return of([
      {
        id: '1',
        type: 'data.type',
        name: 'data.attributes.name',
        createdAt: 'data.attributes.careatd_at',
        updatedAt: 'data.attributes.updated_at'
      }
    ]);
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
    return of({
      1 : {abbr: 'ADMIN_ABBR', title: 'ADMIN_TITLE', class: 'admin'}});
  }

  public getCognitoEndpoint(id: string, params: HttpParams): Observable<ICognitoEndpoint> {
    console.log(id, params);
    return of(this.getMockCognitoEndpoint());
  }

  public getCognitoEndpoints(params: HttpParamsOptions): Observable<ICognitoEndpoint[]> {
    console.log( params);
    return of([this.getMockCognitoEndpoint()]);
  }

  public createCognitoEndpoint(data: ICognitoEndpoint = null): Observable<ICognitoEndpoint> {
    console.log(data);
    return of(this.getMockCognitoEndpoint());
  }
  public findAndCreateCognitoEndpoint(): Observable<ICognitoEndpoint> {
    return of(this.getMockCognitoEndpoint());
  }
}
