import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProfileResponse } from './profile.model';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IProfile } from './profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    @Inject('config') private config: any
  ) { }

  public whoAmI(): Observable<IProfile> {
    const url = `${this.config.env.apiHost}/v4/me`;
    return this.http.get<IProfileResponse>(url)
      .pipe(
        map(resp => resp.data)
      );
  }

  // @ts-ignorets-ignore
  public resetPassword(password: string): Observable<void> {
    return throwError('Not implemented yet');
  }
}
