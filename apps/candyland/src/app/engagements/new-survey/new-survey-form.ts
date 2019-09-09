import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ISurvey } from '@perx/core';

export class NewSurveyForm {

  public static getForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(
        'Survey Template',
        [Validators.required, Validators.minLength(1), Validators.maxLength(60)]
      ),
      headlineMessage: new FormControl(
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(60)]
      ),
      subHeadlineMessage: new FormControl(
        null, [Validators.required,
          Validators.minLength(5), Validators.maxLength(60)]
      ),
      questions: new FormArray([]),
      color: new FormControl(
        'primary',
        [Validators.required]
      ),
      cardBackground: new FormControl(
        null,
        [Validators.required]
      ),
      background: new FormControl(
        null,
        [Validators.required]
      )
    });
  }

  public static getDefaultValue(): ISurvey {
    return {
      title: 'Please help us knowing you better',
      questions: [
        {
          question: 'Which color you like?',
          description: 'Please select',
          id: '1',
          required: false,
          payload: {
            type: 'select',
            multiple: false,
            choices: [
              'blue',
              'white',
              'red'
            ]
          }
        },
        {
          question: 'How can we reach you?',
          description: 'No offence taken',
          id: '9',
          required: false,
          payload: {
            type: 'picture-select',
            multiple: true,
            choices: [
              {
                img_url: 'https://picsum.photos/600/900',
                text: 'The first'
              },
              {
                img_url: 'https://picsum.photos/600/900',
                text: 'The second'
              },
              {
                img_url: 'https://picsum.photos/600/900',
                text: 'The second'
              },
              {
                img_url: 'https://picsum.photos/600/900',
                text: 'The second'
              }
            ]
          }
        },
        {
          question: 'When were you born?',
          description: 'It\'s between us',
          id: '2',
          required: true,
          payload: {
            duration: true,
            type: 'date'
          }
        },
        {
          question: 'How can we reach you?',
          description: 'No offence taken',
          id: '8',
          required: false,
          payload: {
            type: 'phone',
            default_country_code: 'SG'
          }
        },
        {
          question: 'How likely are you to recommend our service?',
          description: 'Please rate us',
          id: '11',
          required: false,
          payload: {
            type: 'rating',
            color: 'primary',
            left_label: 'not much',
            right_label: 'a lot',
            scale: 6,
            shape: 'circle'
          }
        },
        {
          question: 'Tell us more about us',
          description: 'No offence taken',
          id: '7',
          required: true,
          payload: {
            type: 'group',
            questions: [
              {
                question: 'What\'s your favorite color 1',
                description: 'We love blue',
                id: '7.1',
                required: false,
                payload: {
                  type: 'select',
                  choices: [
                    'blue',
                    'white',
                    'red'
                  ]
                }
              },
              {
                question: 'What\'s your favorite color 2',
                description: 'We love blue',
                id: '7.2',
                required: true,
                payload: {
                  type: 'select',
                  choices: [
                    'blue',
                    'white',
                    'red'
                  ]
                }
              }
            ]
          }
        },
        {
          question: 'From when to when was your first job?',
          description: 'Compliance',
          id: '3',
          required: false,
          payload: {
            type: 'date',
            period: true
          }
        },
        {
          question: 'From when to when was your first job?',
          description: 'Compliance',
          id: '4',
          required: false,
          payload: {
            type: 'date',
            period: true
          }
        },
        {
          question: 'Tell us more about you',
          description: 'Be frank',
          id: '5',
          required: false,
          payload: {
            type: 'long-text',
            'max-length': 20
          }
        },
        {
          question: 'Tell us more about us',
          description: 'No offence taken',
          id: '6',
          required: false,
          payload: {
            type: 'long-text'
          }
        }
      ]
    };
  }

}
