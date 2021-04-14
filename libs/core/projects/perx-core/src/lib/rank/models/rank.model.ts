import { IReward } from '../../rewards/models/reward.model';

export type LeaderBoard = {
  displayProperties: {
    aboutText: string;
    aboutImage: {
      value: {
        imageUrl: string;
      }
    }
    header: {
      values: {
        title: string;
      }
    }
  };
  id: number;
  metric: string;
  title: string;
  name: string;
  description: string;
  endDate: Date;
  podiums: Podium[];
  termsAndConditions: string;
  images: [
    {
      filename: string;
      section: string;
      url: string;
    }
  ],
  aboutBanner?: string;
  listBanner?: string;
};

export type UserRanking = {
  displayName?: string | number | boolean | null; // based on custom props
  id: number;
  rank: number | string;
  value: number;
};

export type Podium = {
  id: number;
  outcomes: LeaderboardOutcome[];
  displayProperties: {
    rankName: string;
    rankIcon: {
      value: {
        imageUrl: string;
      }
    };
  }
};

export interface LeaderboardOutcome extends IReward {
  pointsCount?: number;
  modularizableId: number;
  modularizableType: string;
}
