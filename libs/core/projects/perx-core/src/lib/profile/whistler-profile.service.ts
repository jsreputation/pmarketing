import { ProfileService } from './profile.service';
import { Observable, throwError } from 'rxjs';
import {
  IProfile,
  ICustomProperties,
} from './profile.model';
import { Config } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import {
  IWProfileAttributes,
  IJsonApiItem,
  IJsonApiListPayload,
} from '@perxtech/whistler';
import { TokenStorage } from '../utils/storage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WhistlerProfileService extends ProfileService {
  private apiHost: string;

  constructor(
    private http: HttpClient,
    config: Config,
    private tokenStorage: TokenStorage
  ) {
    super();
    this.apiHost = config.apiHost as string;
  }

  public static WhistlerProfileToProfile(profile: IJsonApiItem<IWProfileAttributes>): IProfile {
    return {
      id: +profile.id,
      identifier: profile.attributes.primary_identifier,
      firstName: profile.attributes.first_name || '',
      lastName: profile.attributes.last_name || '',
      phone: profile.attributes.phone_number || '',
      email: profile.attributes.email_address || '',
      joinedDate: profile.attributes.created_at // not sure correct?
    };
  }

  public whoAmI(): Observable<IProfile> {
    const pi: string | undefined = this.tokenStorage.getAppInfoProperty('pi');
    const url: string = `${this.apiHost}/cognito/users`;
    const params: { [k: string]: string } = {};
    if (pi) {
      params['filter[primary_identifier]'] = pi;
    }

    return this.http.get<IJsonApiListPayload<IWProfileAttributes>>(url, { params })
      .pipe(
        map((res: IJsonApiListPayload<IWProfileAttributes>) => {
          if (res.data.length > 0) {
            return res.data[0];
          }
          throw new Error(`There is no user with pi '${pi}'`);
        }),
        map((JsonApiUser: IJsonApiItem<IWProfileAttributes>) => WhistlerProfileService.WhistlerProfileToProfile(JsonApiUser))
      );
  }

  public setCustomProperties(): Observable<void> {
    return throwError('Not implement yet');
  }

  public getCustomProperties(): Observable<ICustomProperties> {
    return throwError('Not implement yet');
  }

  public updateUserInfo(): Observable<void> {
    return throwError('Not implement yet');
  }

  public setCardNumber(): Observable<void> {
    return throwError('Not implement yet');
  }
  public verifyCardNumber(): Observable<boolean> {
    return throwError('Not implement yet');
  }
}
