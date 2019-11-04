import { ISurvey } from './../../survey/models/survey.model';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config/config';
// import { ISurvey } from '../../survey/models/survey.model';
import { Observable } from 'rxjs';
import { IFormsService } from './iforms.service';
import { Injectable } from '@angular/core';
import { pluck, map } from 'rxjs/operators';
import { IJsonApiItemPayload } from '../../jsonapi.payload';

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
    return (this.http.get(`${this.baseUrl}/cognito/tenants/1`).pipe(
      pluck('data', 'attributes', 'properties')
    ) as Observable<ISurvey>);
  }

  public postUser(userObj): Observable<unknown> {
    // to be included
    return this.http.post(`${this.baseUrl}/users`, userObj,{ headers: { 'Content-Type': 'application/vnd.api+json' } })
    .pipe(
      map((res: IJsonApiItemPayload<any>) => res.data),
    )
  }

  // {
  //   "data": {
  //       "type": "users",
  //       "attributes": {
  //           "title": "<string>",
  //           "first_name": "<string>",
  //           "last_name": "<string>",
  //           "phone_number": "<string>",
  //           "email_address": "<string>",
  //           "primary_identifier": "<string>",
  //           "properties": "<string>"
  //       }
  //   }
  // }
}
