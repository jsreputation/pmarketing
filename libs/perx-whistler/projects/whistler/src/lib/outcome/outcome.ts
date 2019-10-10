export interface IOutcome {
    resultId: number;
    resultType: string;
    probability: number;
    lootBoxId?: number;
}
export interface IOutcomeAttributes {
    result_id: number;
    result_type: string;
    probability?: number;
    loot_box_id?: number;
}
