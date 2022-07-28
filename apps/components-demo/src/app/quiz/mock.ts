import { IQuizScore, IQuiz, QuizQuestionType, QuizMode } from '@perxtech/core';

const choices = [
  { title: 'Pouce', id: '' },
  { title: 'Index', id: '' },
  { title: 'Majeur', id: '' },
  { title: 'Annulaire', id: '' },
  { title: 'Auriculaire', id: '' }
];
export const quiz: IQuiz = {
  title: {
    text: 'Question pour un champion'
  },
  timeConfig: {},
  backgroundImgUrl: 'assets/quiz/background.png',
  cardBackgroundImgUrl: 'assets/quiz/card.png',
  mode: QuizMode.swipe,
  questions: [
    {
      id: 'jo',
      question: {
        text: 'Quel est le premier doigt de la main de l\'homme et de certains vertébrés?'
      },
      description: {
        text: 'Swipe to select correct answer'
      },
      required: true,
      payload: {
        type: QuizQuestionType.swipeSelect,
        choices
      }
    },
    {
      id: 'jo',
      question: {
        text: 'Quel est le premier doigt de la main de l\'homme et de certains vertébrés?'
      },
      description: {
        text: 'Swipe to eliminate wrong answers'
      },
      required: false,
      payload: {
        type: QuizQuestionType.swipeDelete,
        choices
      }
    },
    {
      id: 'joe',
      question: {
        text: 'Suite à la réforme territoriale, combien la France métropolitaine compte-t-elle de régions?'
      },
      required: true,
      payload: {
        type: QuizQuestionType.rating,
        scale: 20
      },
    }
  ],
  results: {},
  fontColor: '#0f69af',
  ctaButtonBGColor: '#1ed760',
  ctaButtonTextColor: '#09411d',
};

export const results: IQuizScore[] = [
  {
    questionId: '22',
    time: 25,
    question: 'Quel est le premier doigt de la main de l\'homme et de certains vertébrés?',
    score: 0
  },
  {
    questionId: '22',
    time: 25,
    question: 'Suite à la réforme territoriale, combien la France métropolitaine compte-t-elle de régions?',
    score: undefined // happens, when there is a backend error
  },
  {
    questionId: '23',
    question: 'Quel est le premier doigt de la main de l\'homme et de certains vertébrés?',
    score: 3
  },
  {
    questionId: '22',
    time: 25,
    question: 'Suite à la réforme territoriale, combien la France métropolitaine compte-t-elle de régions?',
    score: 2
  },
  {
    questionId: '22',
    time: 25,
    question: 'Quel est le premier doigt de la main de l\'homme et de certains vertébrés?',
    score: 0
  },
  {
    questionId: '22',
    time: 25,
    question: 'Suite à la réforme territoriale, combien la France métropolitaine compte-t-elle de régions?',
    score: 2
  },
  {
    questionId: '23',
    question: 'Quel est le premier doigt de la main de l\'homme et de certains vertébrés?',
    score: 3
  },
  {
    questionId: '22',
    time: 25,
    question: 'Suite à la réforme territoriale, combien la France métropolitaine compte-t-elle de régions?',
    score: 2
  }
];
