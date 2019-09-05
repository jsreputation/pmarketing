export interface IAnswer {
    question_id?: string;
    content: any;
}

export interface IPoints {
    question_id?: string;
    point: number;
}

export interface IDateRange {
    from: string;
    to: string;
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
    answer?: any;
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
    circle = 'panorama_fish_eye',
    circle_selected = 'brightness_1',
}
