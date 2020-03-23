import { IPoints, IQuiz, QuizQuestionType } from '@perxtech/core';

export const quiz: IQuiz = {
  title: 'Question pour un champion',
  backgroundImgUrl: 'assets/quiz/background.png',
  cardBackgroundImgUrl: 'assets/quiz/card.png',
  questions: [
    {
      id: 'jo',
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
      id: 'joe',
      question: 'Suite à la réforme territoriale, combien la France métropolitaine compte-t-elle de régions?',
      required: true,
      payload: {
        type: QuizQuestionType.rating,
        scale: 20
      }
    }
  ],
  results: {}
};

export const results: IPoints[] = [
  {
    questionId: '22',
    time: 25,
    question: 'Quel est le premier doigt de la main de l\'homme et de certains vertébrés?',
    point: 0
  },
  {
    questionId: '22',
    time: 25,
    question: 'Suite à la réforme territoriale, combien la France métropolitaine compte-t-elle de régions?',
    point: 2
  },
  {
    questionId: '23',
    question: 'Quel est le premier doigt de la main de l\'homme et de certains vertébrés?',
    point: 3
  },
  {
    questionId: '22',
    time: 25,
    question: 'Suite à la réforme territoriale, combien la France métropolitaine compte-t-elle de régions?',
    point: 2
  },
  {
    questionId: '22',
    time: 25,
    question: 'Quel est le premier doigt de la main de l\'homme et de certains vertébrés?',
    point: 0
  },
  {
    questionId: '22',
    time: 25,
    question: 'Suite à la réforme territoriale, combien la France métropolitaine compte-t-elle de régions?',
    point: 2
  },
  {
    questionId: '23',
    question: 'Quel est le premier doigt de la main de l\'homme et de certains vertébrés?',
    point: 3
  },
  {
    questionId: '22',
    time: 25,
    question: 'Suite à la réforme territoriale, combien la France métropolitaine compte-t-elle de régions?',
    point: 2
  }
];
