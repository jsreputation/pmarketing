import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  map,
  mergeMap,
} from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  IProfile,
  ICustomProperties,
  ICardNumber,
} from './profile.model';
import { ProfileService } from './profile.service';

import { Config } from '../config/config';

interface IV4Profile {
  id: number;
  identifier?: string;
  state: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  phone?: string;
  email?: string;
  birthday?: string;
  gender?: string;
  joined_at?: string;
  password_expires_at?: string;
  personal_properties?: {};
}

export interface IV4ProfileResponse {
  data: IV4Profile;
}

@Injectable({
  providedIn: 'root'
})
export class V4ProfileService extends ProfileService {
  private apiHost: string;

  constructor(
    private http: HttpClient,
    config: Config
  ) {
    super();
    this.apiHost = config.apiHost as string;
  }

  public static v4ProfileToProfile(profile: IV4Profile): IProfile {
    return {
      id: profile.id,
      identifier: profile.identifier,
      state: profile.state,
      firstName: profile.first_name,
      lastName: profile.last_name,
      middleName: profile.middle_name,
      phone: profile.phone,
      email: profile.email,
      birthDate: profile.birthday ? new Date(profile.birthday) : undefined,
      gender: profile.gender,
      joinedDate: profile.joined_at,
      passwordExpiryDate: profile.password_expires_at,
      customProperties: profile.personal_properties
    };
  }

  public whoAmI(): Observable<IProfile> {
    const url = `${this.apiHost}/v4/customers/me`;
    return this.http.get<IV4ProfileResponse>(url)
      .pipe(
        map((resp: IV4ProfileResponse) => V4ProfileService.v4ProfileToProfile(resp.data))
      );
  }

  public setCustomProperties(data: ICustomProperties): Observable<void> {
    return this.whoAmI().pipe(
      mergeMap(
        (profile: IProfile) => this.http.patch<void>(
          `${this.apiHost}/v4/customers/${profile.id}`,
          {
            personal_properties: {
              ...profile.customProperties,
              ...data
            }
          })
      )
    );
  }

  public getCustomProperties(): Observable<ICustomProperties> {
    return this.whoAmI()
      .pipe(
        map((profile: IProfile) => profile.customProperties || {})
      );
  }

  public updateUserInfo(data: IProfile): Observable<void> {
    return this.whoAmI().pipe(
      mergeMap(
        (profile: IProfile) => this.http.patch<void>(
          `${this.apiHost}/v4/customers/${profile.id}`,
          {
            ...profile,
            ...data
          })
      )
    );
  }

  public setCardNumber(data: ICardNumber): Observable<any> {
    return this.whoAmI().pipe(
      mergeMap(
        (profile: IProfile) => this.http.patch<void>(
          `${this.apiHost}/v4/customers/${profile.id}/map_cardnumber`,
          {
            data
          })
      )
    );
  }
}
