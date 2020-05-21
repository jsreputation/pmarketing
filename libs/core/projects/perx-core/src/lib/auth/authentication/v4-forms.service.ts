import { Observable, of } from 'rxjs';
import { IFormsService } from './iforms.service';
import { Injectable } from '@angular/core';
import { ISurvey, SurveyQuestionType } from '../../survey/models/survey.model';

@Injectable({
  providedIn: 'root'
})
export class V4FormsService implements IFormsService {
  public getSignupForm(): Observable<ISurvey | undefined> {
    return of({
      title: '',
      results: {},
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
  }

  public getLuckyDrawDetailsForm(): Observable<ISurvey | undefined> {
    return of({
      title: '',
      results: {},
      questions: [
        {
          id: 'sign-up',
          question: '',
          required: false,
          payload: {
            type: SurveyQuestionType.questionGroup,
            questions: [
              {
                id: 'hkidNumber',
                question: 'HKID Number',
                required: true,
                payload: {
                  type: SurveyQuestionType.longText
                }
              },
              {
                id: 'nickName',
                question: 'Nick Name',
                required: true,
                payload: {
                  type: SurveyQuestionType.longText
                }
              },
              {
                id: 'tnc',
                question: 'Term and Condition',
                required: true,
                payload: {
                  type: SurveyQuestionType.multipleChoice,
                  multiple: true,
                  choices: [
                    'I agree HSBC Life to save my personal information for lucky draw and future direct marketing purpose (For details, please refer to the PICS)',
                  ]
                }
              },
            ]
          }
        }
      ]
    });
  }
}