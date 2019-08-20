export interface IAnswer {
    response_id: string;
    question_id: string;
    content: number | string[];
}

export interface IQuestion {
    id: string;
    question: string;
    description?: string;
    required: boolean;
    payload: IPayload;
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
export interface IPayload {
    type: SurveyQuestionType;
    [key: string]: any;
}
