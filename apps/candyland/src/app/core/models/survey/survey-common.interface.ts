import { IQuestion } from '@perx/core';

export interface ISurveyForm {
  id: string;
  type: string;
  created_at: string;
  updated_at: string;
  name: string;
  headlineMessage: string;
  subHeadlineMessage: string;
  questions: IQuestion[];
  color: string;
  cardBackground: string;
  background: string;
  buttonText: string;
  description: string;
  attribute_type: string;
}
