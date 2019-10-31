export interface IWQuestion {
  id?: string;
  question: string;
  description?: string;
  required: boolean;
  payload: IWPayload;
  answer?: any;
}

export enum WSurveyQuestionType {
  rating = 'rating',
  pictureChoice = 'picture-select',
  longText = 'long-text',
  multipleChoice = 'select',
  questionGroup = 'group',
  date = 'date',
  phone = 'phone'
}

export interface IWPayload {
  type: WSurveyQuestionType;
  [key: string]: any;
}
