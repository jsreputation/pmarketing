export interface StampsGraphicData {
  title: string;
  total: number;
  summaryInfo: {
    title: string,
    value: number | string
  }[];
  payload: {
    choices: {
      img_url: string,
      text?: string
    },
    amount: number
  }[];
}
