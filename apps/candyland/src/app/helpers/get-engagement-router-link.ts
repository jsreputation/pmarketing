import { GamesRouterLink } from './games-router-link.enum';
import { EngagementType } from '@cl-core/models/engagement/engagement-type.enum';

export function getEngagementRouterLink(engagementType: string, gameType?: string): string {

  let path: string;

  switch (engagementType) {
    case EngagementType.stamp:
      path = '/engagements/new-stamp';
      break;
    case EngagementType.instantReward:
      path = '/engagements/new-instant-reward';
      break;
    case EngagementType.games:
      path = GamesRouterLink[gameType];
      break;
    case EngagementType.survey:
      path = '/engagements/new-survey';
  }

  return path;
}
