export interface IOutcome {
    id?: string;
    resultId: number;
    resultType: string;
    probability: number;
    lootBoxId?: number;
    limit: number;
}
