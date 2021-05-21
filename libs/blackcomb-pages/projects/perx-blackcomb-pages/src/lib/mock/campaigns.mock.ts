import {
  CampaignOutcomeType,
  CampaignState,
  CampaignType,
  ICampaign,
  ICampaignOutcome,
  IProgressCampaign,
  IProgressLevel,
  IQuest,
  IQuestTask,
  QuestState
} from '@perxtech/core';
import { rewards } from './rewards.mock';

export const campaigns: ICampaign[] = [
  // {
  //     id: 1,
  //     name: 'Smash that Pinata',
  //     description: '',
  //     type: CampaignType.stamp,
  //     state: CampaignState.active,
  //     endsAt: '2017-12-17T03:24:00'
  // },
  // {
  //     id: 2,
  //     name: 'all-it GAME',
  //     description: 'all-it description',
  //     type: CampaignType.game,
  //     state: CampaignState.active,
  //     endsAt: '2017-11-17T03:24:00'
  // },
  {
    id: 3,
    name: 'Prudential Event',
    description: 'all-it description',
    type: CampaignType.survey,
    state: CampaignState.active,
    endsAt: new Date('2017-10-17T03:24:00'),
    thumbnailUrl: 'assets/pinata/opened-img.png'
  },
  {
    id: 1,
    name: 'Prudential Event',
    description: 'all-it description',
    type: CampaignType.survey,
    state: CampaignState.active,
    endsAt: new Date('2017-10-17T03:24:00'),
    thumbnailUrl: 'assets/pinata/opened-img.png'
  },
  {
    id: 4,
    name: 'BC step thru',
    description: 'keep moving forward',
    tnc: 'this are the TnC\'s that you are to abide by',
    termsAndConditions: 'this are the TnC\'s that you are to abide by',
    type: CampaignType.progress,
    state: CampaignState.active,
    endsAt: new Date('2022-11-17T03:24:00'),
    beginsAt: new Date(),
    rewards,
    rewardsCount: 4,
    thumbnailUrl: 'https://picsum.photos/300/200?random=1',
    campaignBannerUrl: 'https://picsum.photos/300/200?random=2',
    displayProperties: {
      progressDetails: {
        title: 'How far can you go?',
        description: 'Estimated time to complete - more than enough',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        imageUrl: 'https://picsum.photos/300/200?random=3',
        successImageUrl: 'assets/done_current.png',
        howToParticipateBody: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.'
      }
    },
    enrolled: true
  },
  {
    id: 5,
    name: 'BC step thru - completed',
    description: 'keep moving forward',
    tnc: 'this are the TnC\'s that you are to abide by',
    termsAndConditions: 'this are the TnC\'s that you are to abide by',
    type: CampaignType.progress,
    state: CampaignState.active,
    endsAt: new Date('2022-11-17T03:24:00'),
    beginsAt: new Date(),
    rewards,
    rewardsCount: 4,
    thumbnailUrl: 'https://picsum.photos/300/200?random=1',
    campaignBannerUrl: 'https://picsum.photos/300/200?random=2',
    displayProperties: {
      progressDetails: {
        title: 'How far can you go?',
        description: 'Estimated time to complete - more than enough',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        imageUrl: 'https://picsum.photos/300/200?random=3',
        successImageUrl: 'assets/done_current.png',
        howToParticipateBody: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.'
      }
    },
    enrolled: true
  }
];

export const campaignOutcomes: ICampaignOutcome[] = [
  {
    id: 1,
    type: CampaignOutcomeType.reward,
    name: 'progress reward item 1',
    levelId: 1 // used for progress campaigns
  },
  {
    id: 2,
    type: CampaignOutcomeType.points,
    name: 'progress points item 2',
    pointsCount: 220,
    levelId: 21 // used for progress campaigns
  },
  {
    id: 3,
    type: CampaignOutcomeType.points,
    name: 'progress points item 3',
    pointsCount: 1110,
    levelId: 34 // used for progress campaigns
  },
  {
    id: 4,
    type: CampaignOutcomeType.reward,
    name: 'progress reward item 3',
    levelId: 34 // used for progress campaigns
  },
  {
    id: 5,
    type: CampaignOutcomeType.reward,
    name: 'progress reward item 1',
    levelId: 44 // used for progress campaigns
  },
  {
    id: 6,
    type: CampaignOutcomeType.points,
    name: 'progress points item 2',
    pointsCount: 220,
    levelId: 45 // used for progress campaigns
  },
  {
    id: 7,
    type: CampaignOutcomeType.points,
    name: 'progress points item 3',
    pointsCount: 1110,
    levelId: 46 // used for progress campaigns
  },
  {
    id: 8,
    type: CampaignOutcomeType.reward,
    name: 'progress reward item 3',
    levelId: 46 // used for progress campaigns
  }
];

// quest + progress are similar
export const questCampaigns: IQuest[] = [
  {
    id: 1,
    campaignId: 4,
    userAccountId: 1, // supposed to be current user
    state: QuestState.inProgress,
  },
];

export const progressCampaigns: IProgressCampaign[] = [
  {
    id: 1,
    campaignId: 4,
    userAccountId: 1, // supposed to be current user
    state: QuestState.inProgress,
    completedProgress: 67,
    unitBaseName: 'CP' // todo: probably belongs in campaign.displayproperties instead
  },
  {
    id: 2,
    campaignId: 5,
    userAccountId: 1, // supposed to be current user
    state: QuestState.completed,
    completedProgress: 100,
    unitBaseName: 'CP' // todo: probably belongs in campaign.displayproperties instead
  }
];

// quest task + progress levels are also similar
export const campaignTasks: IQuestTask[] = [
  {
    id: 1,
    campaignId: 4,
    state: QuestState.completed,
    title: 'task 1',
    description: 'did this thingy already',
    imageUrl: 'https://picsum.photos/200/200?random=4'
  },
  {
    id: 2,
    campaignId: 4,
    state: QuestState.inProgress,
    title: 'task 2',
    description: 'do this thingy',
    imageUrl: 'https://picsum.photos/200/200?random=5'
  }
];

export const campaignLevels: IProgressLevel[] = [
  {
    id: 1,
    campaignId: 4,
    state: QuestState.completed,
    title: 'task 1',
    description: 'did this thingy already',
    imageUrl: 'https://picsum.photos/200/200?random=4',
    completedProgress: 100,
    levelTarget: 100
  },
  {
    id: 21,
    campaignId: 4,
    state: QuestState.inProgress,
    title: 'task 2',
    description: 'do this thingy',
    imageUrl: 'https://picsum.photos/200/200?random=5',
    completedProgress: 34,
    levelTarget: 50
  },
  {
    id: 34,
    campaignId: 4,
    state: QuestState.inactive,
    title: 'task 3',
    description: 'do the above thingy first',
    imageUrl: 'https://picsum.photos/200/200?random=6',
    completedProgress: 0,
    levelTarget: 120
  },
  {
    id: 44,
    campaignId: 5,
    state: QuestState.completed,
    title: 'task 1',
    description: 'did this thingy already',
    imageUrl: 'https://picsum.photos/200/200?random=4',
    completedProgress: 100,
    levelTarget: 100
  },
  {
    id: 45,
    campaignId: 5,
    state: QuestState.completed,
    title: 'task 2',
    description: 'do this thingy',
    imageUrl: 'https://picsum.photos/200/200?random=5',
    completedProgress: 50,
    levelTarget: 50
  },
  {
    id: 46,
    campaignId: 5,
    state: QuestState.completed,
    title: 'task 3',
    description: 'do the above thingy first',
    imageUrl: 'https://picsum.photos/200/200?random=6',
    completedProgress: 120,
    levelTarget: 120
  }
];
