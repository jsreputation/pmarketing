import { IWQuestion } from '@perxtech/whistler';

export interface ISurveyForm {
  id: string;
  type: string;
  created_at: string;
  updated_at: string;
  name: string;
  headlineMessage: string;
  subHeadlineMessage: string;
  questions: IWQuestion[];
  color: string;
  cardBackground: string;
  background: string;
  buttonText: string;
  description: string;
  attribute_type: string;
}

export interface ICountries {
  name: string;
  code: string;
}
