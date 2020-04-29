export type LeaderBoard = {
  displayProperties: {
    [key: string]: any;
  };
  id: number;
  metric: string;
  title: string;
};

export type UserRanking = {
  displayName: string;
  id: number;
  rank: number;
  value: number;
};
