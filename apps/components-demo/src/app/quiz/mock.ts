import { IQuiz, QuizQuestionType } from '@perxtech/core';

export const quiz: IQuiz = {
  title: 'Question pour un champion',
  backgroundImgUrl: 'assets/quiz/background.png',
  questions: [
    {
      question: 'Quel est le premier doigt de la main de l\'homme et de certains vertébrés?',
      required: true,
      payload: {
        type: QuizQuestionType.multipleChoice,
        choices: [
          'Pouce',
          'Index',
          'Majeur',
          'Annulaire',
          'Auriculaire'
        ]
      }
    },
    {
      question: 'Suite à la réforme territoriale, combien la France métropolitaine compte-t-elle de régions ?',
      required: true,
      payload: {
        type: QuizQuestionType.rating,
        scale: 20
      }
    }
  ],
  results: {}
};
