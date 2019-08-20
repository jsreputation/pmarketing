export interface IAnswer {
    response_id: number;
    question_id: number;
    content: number | string[];
}

export interface IResource {
    data: {
        id: number;
        type: string;
        attributes: any;
    };
}
