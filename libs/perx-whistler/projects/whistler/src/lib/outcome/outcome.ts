export interface IOutcome {
    resultId: number;
    resultType: string;
    probability: number;
}

export interface IOutcomeAttributes {
    result_id: number;
    result_type: string;
    probability?: number;
}
