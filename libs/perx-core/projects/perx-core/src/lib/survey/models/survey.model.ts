export interface Answer {
    response_id: string;
    question_id: string;
    content: number | string[];
}

export interface Resource {
    data: {
        id: string;
        type: string;
        attributes: any;
    };
}
