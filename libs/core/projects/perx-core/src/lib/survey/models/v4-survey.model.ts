import { IQQuestion } from '../../quiz/quiz.service';
import { Asset } from '../../game/v4-game.service';

export interface IV4SurveyOutcome {
  title: string;
  subTitle: string;
  image?: string;
  button: string;
}

export interface IV4SurveyQuestion {
  question: { [k: string]: ({text: string} & {image: {value: {image_url}}}) };
  description: { [k: string]: {text: string} };
  id: string;
  required: boolean;
  payload: any;
}

/* eslint-disable */
export interface IV4SurveyDisplayProperties {
  title: string;
  questions: IV4SurveyQuestion[];
  landing_page: {
    body: string;
    media?: { youtube?: string; };
    heading: string;
    button_text: string;
    sub_heading: string;
  };
  background_image?: Asset;
  card_image?: Asset;
  header?: {
    value?: {
      title?: { [k: string]: {text: string} };
      description?: { [k: string]: {text: string} };
    };
  };
  headline_text?: string;
  body_text?: string;
  button_text?: string;
}
/* eslint-enable */

export interface IV4Survey {
  id?: number;
  campaignId?: number;
  title?: {text: string};
  subTitle?: {text: string};
  cardBackgroundImgUrl?: string;
  backgroundImgUrl?: string;
  questions: IQQuestion[];
  results: {
    outcome?: IV4SurveyOutcome;
    noOutcome?: IV4SurveyOutcome;
  };
  displayProperties?: IV4SurveyDisplayProperties;
}

// note: only multiple choices for select
// https://perxtechnologies.atlassian.net/wiki/spaces/PROD/pages/793280682/Product+spec+Campaign+-+Survey
export enum V4SurveyQuestionType {
  rating = 'rating',
  pictureChoice = 'picture-select',
  multipleChoice = 'select',
  text = 'text', // will be normal text inpit
  date = 'date',
  email = 'email',
  phone = 'phone',
  number = 'number'
}

// payload will be form values
