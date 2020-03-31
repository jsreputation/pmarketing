export interface IBaseQuestionReport {
  title: string;
  summaryInfo: {
    title: string,
    value: number | string
  }[];
  questions?: any[];
}
