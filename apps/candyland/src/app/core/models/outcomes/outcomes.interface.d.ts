declare interface IOutcome {
  resultId: number;
  resultType: string;
  probability: number;
}

declare interface IOutcomeApi {
  id: string;
  type: string;
  attributes: {
    result_id: number;
    result_type: string;
    probability?: number;
  };
}
