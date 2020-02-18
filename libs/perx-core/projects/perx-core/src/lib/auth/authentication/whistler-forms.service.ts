import { ISurvey, SurveyQuestionType } from '../../survey/models/survey.model';
import { Observable, of } from 'rxjs';
import { IFormsService } from './iforms.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhistlerFormsService implements IFormsService {
  public getSignupForm(): Observable<ISurvey | undefined> {
    return of({
      title: '',
      questions: [
        {
          id: 'sign-up',
          question: '',
          required: false,
          payload: {
            type: SurveyQuestionType.questionGroup,
            questions: [
              {
                id: 'firstName',
                question: 'First Name',
                required: true,
                payload: {
                  type: SurveyQuestionType.longText
                }
              },
              {
                id: 'lastName',
                question: 'Last Name',
                required: true,
                payload: {
                  type: SurveyQuestionType.longText
                }
              },
              {
                id: 'primary_identifier',
                question: 'Phone Number',
                required: true,
                payload: {
                  type: SurveyQuestionType.phone,
                  default_country_code: '+65'
                }
              },
              {
                id: 'password',
                question: 'Create your Password',
                required: true,
                payload: {
                  type: SurveyQuestionType.password
                }
              },
            ]
          }
        }
      ]
    });
    return of();
    // return this.http.get<IJsonApiListPayload<IWCognitoTenantAttributes>>(`${this.baseUrl}/cognito/tenants/3`)
    //   .pipe(
    //     map(res => res.data),
    //     map(res => res[0]),
    //     map(res => res.attributes.properties.signup),
    //     map(form => form ? SurveyService.WSurveyToSurvey({
    //       data: {
    //         id: '',
    //         type: '',
    //         links: { self: '' },
    //         attributes: {
    //           display_properties: form
    //         }
    //       }
    //     }) : undefined)
    //   );
  }
}
