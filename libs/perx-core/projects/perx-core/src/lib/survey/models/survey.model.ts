export interface IAnswer {
    question_id?: string;
    content: number | string | boolean;
}

export interface IPoints {
    question_id?: string;
    point: number;
}
export interface ITracker {
    [key: string]: any;
}

export interface IQuestion {
    id: string;
    question: string;
    description?: string;
    required: boolean;
    payload: IPayload;
    answer?: string | number | boolean;
}

export interface ISurvey {
    title: string;
    questions: IQuestion[];
}

export enum SurveyQuestionType {
    rating = 'rating',
    pictureChoice = 'picture-select',
    longText = 'long-text',
    multipleChoice = 'select',
    questionGroup = 'group',
    date = 'date',
    phone = 'phone'
}

export interface IErrors {
    hasError?: boolean;
    isRequired?: boolean;
    isValidDate?: boolean;
    isExceedMaxLength?: boolean;
    isValidPhoneNumber?: boolean;
}

export interface IPayload {
    type: string;
    [key: string]: any;
}

export enum SurveyRatingIcons {
    star = 'star_border',
    star_selected = 'star',
    heart = 'favorite_border',
    heart_selected = 'favorite',
    circle = 'circle_border',
    circle_selected = 'circle',
}