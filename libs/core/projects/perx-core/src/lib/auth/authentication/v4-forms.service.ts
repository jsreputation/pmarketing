import { Observable, of } from 'rxjs';
import { IFormsService } from './iforms.service';
import { Injectable } from '@angular/core';
import { ISurvey } from '../../survey/models/survey.model';

@Injectable({
  providedIn: 'root'
})
export class V4FormsService implements IFormsService {
  public getSignupForm(): Observable<ISurvey | undefined> { // not stepper
    return of({
      title: {text: ''},
      results: {},
      fields: [
        {
          templateOptions: {
            label: 'Sign Up',
            key: 'sign-up',
            required: true
          },
          fieldGroup: [
            {
              key: 'first_name',
              type: 'input',
              templateOptions: {
                label: 'First name',
                required: true
              }
            },
            {
              key: 'last_name',
              type: 'input',
              templateOptions: {
                label: 'Last name',
                required: true
              }
            },
            {
              key: 'primary_identifier',
              type: 'input',
              templateOptions: {
                type: 'phone',
                label: 'Phone number',
                required: true
              }
            },
            {
              key: 'password',
              type: 'password',
              templateOptions: {
                label: 'Create your Password',
                required: true
              }
            }
          ]
        }
      ]
    });
  }

  public getLuckyDrawDetailsForm(): Observable<ISurvey | undefined> {
    return of({
      title: {text: ''},
      results: {},
      fields: [
        {
          templateOptions: {
            label: 'Sign Up',
            key: 'sign-up',
            required: true
          },
          fieldGroup: [
            {
              key: 'hkidNumber',
              type: 'input',
              templateOptions: {
                label: 'HKID Number',
                required: true
              }
            },
            {
              key: 'nickName',
              type: 'input',
              templateOptions: {
                label: 'Nickname',
                required: true
              }
            },
            {
              key: 'tnc',
              type: 'input',
              templateOptions: {
                type: 'select',
                multiple: true,
                label: 'Terms and Condition',
                required: true
              }
            }
          ]
        }
      ]
    });
  }
}
