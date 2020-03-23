import { IQuiz, QuizQuestionType, ICampaign, CampaignType, CampaignState } from '@perxtech/core';

export const quiz: IQuiz = {
  title: 'Question pour un champion',
  subTitle: 'Select one option from the choices below ',
  backgroundImgUrl: 'assets/quiz/background.png',
  cardBackgroundImgUrl: 'assets/quiz/card.png',
  questions: [
    {
      id: 'first',
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
      id: 'second',
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

export const campaigns: ICampaign[] = [
  {
    id: 1,
    name: 'Easy Difficulty: Week 1',
    description: 'Play now',
    type: CampaignType.quiz,
    state: CampaignState.active,
    endsAt: null,
    campaignBannerUrl: 'assets/quiz/easy.png'
  },
  {
    id: 2,
    name: 'Medium Difficulty: Week 1',
    description: 'Play now',
    type: CampaignType.quiz,
    state: CampaignState.active,
    endsAt: null,
    campaignBannerUrl: 'assets/quiz/medium.png'
  },
  {
    id: 3,
    name: 'Hard Difficulty: Week 1',
    description: 'Play now',
    type: CampaignType.quiz,
    state: CampaignState.active,
    endsAt: null,
    campaignBannerUrl: 'assets/quiz/hard.png'
  },
]