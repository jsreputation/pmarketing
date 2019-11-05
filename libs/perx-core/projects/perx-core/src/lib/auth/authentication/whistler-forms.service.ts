import { ISurvey } from './../../survey/models/survey.model';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config/config';
import { Observable } from 'rxjs';
import { IFormsService } from './iforms.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IJsonApiListPayload } from '../../jsonapi.payload';
import { IWCognitoTenantAttributes } from '@perx/whistler';

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
    return this.http.get<IJsonApiListPayload<IWCognitoTenantAttributes>>(`${this.baseUrl}/cognito/tenants/`)
      .pipe(
        map(res => res.data),
        map(res => res[0]),
        map(res => res.attributes.properties.signup)
      ) as Observable<ISurvey>;
  }
}
