import { ISurvey } from './../../survey/models/survey.model';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config/config';
import { Observable } from 'rxjs';
import { IFormsService } from './iforms.service';
import { Injectable } from '@angular/core';
import { pluck, map } from 'rxjs/operators';
import { IJsonApiItem } from '../../jsonapi.payload';
import { ICognitoUserAttributes, ICognitoUObject } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class WhistlerFormsService implements IFormsService {
  private baseUrl: string;
  // @ts-ignore
  constructor(private config: Config, private http: HttpClient) {
    this.baseUrl = config.apiHost as string;
  }

  public getSignupForm(): Observable<ISurvey> {
    return this.http.get(`${this.baseUrl}/cognito/tenants/`).pipe(
      pluck('data'),
      map(res => res[0]),
      pluck('attributes', 'properties')
    ) as Observable<ISurvey>;
  }

  public postUser(
    userObj: ICognitoUObject
  ): Observable<IJsonApiItem<ICognitoUserAttributes>> {
    const body = {
      data: {
        type: 'users',
        attributes: { ...userObj }
      }
    };
    return this.http.post<IJsonApiItem<ICognitoUserAttributes>>(
      `${this.baseUrl}/cognito/users`,
      body,
      { headers: { 'Content-Type': 'application/vnd.api+json' } }
    );
  }
}
