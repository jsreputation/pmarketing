import { CampaignState, CampaignType, ICampaign, ICampaignService, IQuiz, QuizQuestionType } from '@perxtech/core';
import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const getReward = () => ({
  id: 42,
  name: '',
  subtitle: '',
  description: '',
  validFrom: null,
  validTo: null,
  rewardBanner: '',
  termsAndConditions: '',
  inventory: {
    rewardTotalBalance: Math.floor(Math.random() * 1000)
  }
});
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
    type: CampaignType.game,
    state: CampaignState.active,
    endsAt: null,
    campaignBannerUrl: 'assets/quiz/background.png',
    rewards: [getReward()],
    tnc: `<iframe width="400"  src="https://www.youtube.com/embed/L94GSggRvE4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <br>
    The LIFE Dojo game starts every Thursday at 9:30pm. Watch the video above and answer the question in 15 seconds. Get at least one right answer and grab it while it lasts!
    <br/><br/>
    <a>Get more health and finance tips<br>from LIFE Talk</a>`
  },
  {
    id: 2,
    name: 'Medium Difficulty: Week 1',
    description: 'Play now',
    type: CampaignType.game,
    state: CampaignState.active,
    endsAt: null,
    campaignBannerUrl: 'assets/quiz/medium.png',
    rewards: [getReward()]
  },
  {
    id: 3,
    name: 'Hard Difficulty: Week 1',
    description: 'Play now',
    type: CampaignType.game,
    state: CampaignState.active,
    endsAt: null,
    campaignBannerUrl: 'assets/quiz/hard.png',
    rewards: [getReward()]
  },
];

export const campaignServiceStub: Partial<ICampaignService> = {
  getCampaign: (id) => of(campaigns)
    .pipe(
      map(cs => cs.filter(c => c.id === id)),
      filter(cs => cs.length > 0),
      map(cs => cs[0])
    ),
  getCampaigns: ({ type }) => of([...campaigns])
    .pipe(map(cs => cs.filter(c => c.type === type)))
};
