export interface IOutcome {
  title: string;
  button: string;
  subTitle: string;
  banner: string;
  backgroundImgUrl: string;
  cardBackgroundImgUrl: string;
  results: {
    noOutcome?: IOutcomeMsg;
  };
}

export interface IOutcomeMsg {
  title: string;
  subTitle: string;
  image?: string;
  button: string;
}
