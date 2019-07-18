import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IProfile } from './profile.model';
import { ProfileService } from './profile.service';

interface IV4Profile {
  id: number;
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

interface IV4ProfileResponse {
  data: IV4Profile;
}

@Injectable({
  providedIn: 'root'
})
export class V4ProfileService extends ProfileService {

  constructor(
    private http: HttpClient,
    @Inject('config') private config: any
  ) {
    super();
  }

  public static v4ProfileToProfile(profile: IV4Profile): IProfile {
    return {
      id: profile.id,
      state: profile.state,
      firstName: profile.first_name,
      lastName: profile.last_name,
      middleName: profile.middle_name,
      phone: profile.phone,
      email: profile.email,
      birthDate: profile.birthday,
      gender: profile.gender,
      joinedDate: profile.joined_at,
      passwordExpiryDate: profile.password_expires_at,
      personalProperties: profile.personal_properties
    };
  }

  public whoAmI(): Observable<IProfile> {
    const url = `${this.config.env.apiHost}/v4/customers/me`;
    return this.http.get<IV4ProfileResponse>(url)
      .pipe(
        map((resp: IV4ProfileResponse) => V4ProfileService.v4ProfileToProfile(resp.data))
      );
  }
}
