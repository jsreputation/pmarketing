import { ISurvey } from './../../survey/models/survey.model';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config/config';
import { Observable, throwError } from 'rxjs';
import { IFormsService } from './iforms.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SurveyService } from '../../survey/survey.service';

import {
  IWCognitoTenantAttributes,
  IJsonApiListPayload,
} from '@perxtech/whistler';

@Injectable({
  providedIn: 'root'
})
export class WhistlerFormsService implements IFormsService {
  private baseUrl: string;
  // @ts-ignore
  constructor(private config: Config, private http: HttpClient) {
    this.baseUrl = config.apiHost as string;
  }

  public getSignupForm(): Observable<ISurvey | undefined> {
    return this.http.get<IJsonApiListPayload<IWCognitoTenantAttributes>>(`${this.baseUrl}/cognito/tenants/`)
      .pipe(
        map(res => res.data),
        map(res => res[0]),
        map(res => res.attributes.properties.signup),
        map(form => form ? SurveyService.WSurveyToSurvey({
          data: {
            id: '',
            type: '',
            links: { self: '' },
            attributes: {
              display_properties: form
            }
          }
        }) : undefined)
      );
  }

  public getLuckyDrawDetailsForm(): Observable<ISurvey | undefined> {
    return throwError('Not implement yet.');
  }
}
