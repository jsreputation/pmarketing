import { ISurvey, SurveyQuestionType } from '@perx/core';

export const mock: ISurvey = {
  title: 'Please help us knowing you better',
  results: {},
  questions: [
    {
      question: 'How can we reach you?',
      description: 'No offence taken',
      id: '9',
      required: false,
      payload: {
        type: SurveyQuestionType.pictureChoice,
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
      question: 'How likely are you to recommend our service?',
      description: 'Please rate us',
      id: '1',
      required: false,
      payload: {
        type: SurveyQuestionType.rating,
        color: 'primary',
        left_label: 'not much',
        right_label: 'a lot',
        scale: 4,
        shape: 'star'
      }
    },
    {
      question: 'How likely are you to recommend our service?',
      description: 'Please rate us',
      id: '10',
      required: false,
      payload: {
        type: SurveyQuestionType.rating,
        color: 'primary',
        left_label: 'not much',
        right_label: 'a lot',
        scale: 5,
        shape: 'heart'
      }
    },
    {
      question: 'How likely are you to recommend our service?',
      description: 'Please rate us',
      id: '11',
      required: false,
      payload: {
        type: SurveyQuestionType.rating,
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
        type: SurveyQuestionType.questionGroup,
        questions: [
          {
            question: 'What\'s your favorite color 1',
            description: 'We love blue',
            id: '7.1',
            required: false,
            payload: {
              type: SurveyQuestionType.multipleChoice,
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
              type: SurveyQuestionType.multipleChoice,
              choices: [
                'blue',
                'white',
                'red'
              ]
            }
          },
          {
            question: 'What\'s your favorite color 3',
            description: 'We love blue',
            id: '7.3',
            required: true,
            payload: {
              type: SurveyQuestionType.questionGroup,
              questions: [
                {
                  question: 'What\'s your favorite color 3.1',
                  description: 'We love blue',
                  id: '7.3.1',
                  required: false,
                  payload: {
                    type: SurveyQuestionType.multipleChoice,
                    choices: [
                      'blue',
                      'white',
                      'red'
                    ]
                  }
                },
                {
                  question: 'What\'s your favorite color 3.2',
                  description: 'We love blue',
                  id: '7.3.2',
                  required: true,
                  payload: {
                    type: SurveyQuestionType.multipleChoice,
                    choices: [
                      'blue',
                      'white',
                      'red'
                    ]
                  }
                },
              ]
            }
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
        type: SurveyQuestionType.date
      }
    },
    {
      question: 'From when to when was your first job?',
      description: 'Compliance',
      id: '3',
      required: false,
      payload: {
        type: SurveyQuestionType.date,
        period: true
      }
    },
    {
      question: 'From when to when was your first job?',
      description: 'Compliance',
      id: '4',
      required: false,
      payload: {
        type: SurveyQuestionType.date,
        period: true
      }
    },
    {
      question: 'Tell us more about you',
      description: 'Be frank',
      id: '5',
      required: false,
      payload: {
        type: SurveyQuestionType.longText,
        'max-length': 20
      }
    },
    {
      question: 'Tell us more about us',
      description: 'No offence taken',
      id: '6',
      required: false,
      payload: {
        type: SurveyQuestionType.longText
      }
    },
    {
      question: 'How can we reach you?',
      description: 'No offence taken',
      id: '8',
      required: false,
      payload: {
        type: SurveyQuestionType.phone,
        default_country_code: 'SG'
      }
    }
  ]
};
