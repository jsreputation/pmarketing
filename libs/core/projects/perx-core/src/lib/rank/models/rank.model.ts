export type LeaderBoard = {
  displayProperties: {
    [key: string]: any;
  };
  id: number;
  metric: string;
  title: string;
};

export type UserRanking = {
  displayName?: string | number | boolean | null; // based on custom props
  id: number;
  rank: number | string;
  value: number;
};
