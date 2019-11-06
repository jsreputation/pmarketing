import { ISurvey, IQuestion } from './../../survey/models/survey.model';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config/config';
import { Observable } from 'rxjs';
import { IFormsService } from './iforms.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IJsonApiListPayload } from '../../jsonapi.payload';
import { IWCognitoTenantAttributes, IWSurveyDisplayProperties } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class WhistlerFormsService implements IFormsService {
  private baseUrl: string;
  // @ts-ignore
  constructor(private config: Config, private http: HttpClient) {
    this.baseUrl = config.apiHost as string;
  }

  private static WSurveyToSurvey(survey: IWSurveyDisplayProperties): ISurvey {
    const iQuestions: IQuestion[] = survey.questions.map((q: any) =>
      ({id: q.id, question: q.question, required: q.required, payload: q.payload})
    );
    return { id: 'signup', title: survey.title, questions: iQuestions};
  }

  public getSignupForm(): Observable<ISurvey> {
    return this.http.get<IJsonApiListPayload<IWCognitoTenantAttributes>>(`${this.baseUrl}/cognito/tenants/`)
      .pipe(
        map(res => res.data),
        map(res => res[0]),
        map(res => res.attributes.properties.signup),
        map(res => WhistlerFormsService.WSurveyToSurvey(res))
      );
  }
}
