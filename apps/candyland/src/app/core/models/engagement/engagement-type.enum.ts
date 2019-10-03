// tslint:disable
export enum EngagementType {
  survey = 'survey',
  games = 'game',
  stamp = 'stamps',
  instantReward = 'instant_reward'
}

export enum EngagementTypeFromAPIMapping {
  survey = 'survey',
  game = 'game',
  instant_outcome = 'instant_reward',
  loyalty = 'stamps'
}

export enum EngagementTypeAPIMapping {
  survey = 'survey',
  game = 'game',
  instant_reward = 'instant_outcome',
  stamps = 'loyalty'
}
