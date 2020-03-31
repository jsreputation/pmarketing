import { ISurvey, SurveyQuestionType } from '@perxtech/core';

export const survey: ISurvey = {
  title: 'Please help us knowing you better',
  results: {},
  questions: [
    {
      question: 'Which color you like?',
      description: 'Please select',
      id: '1',
      required: false,
      payload: {
        type: SurveyQuestionType.multipleChoice,
        multiple: false,
        choices: [
          'blue',
          'white',
          'red'
        ]
      }
    }
  ]
};
