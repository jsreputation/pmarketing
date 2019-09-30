export class OutcomesHttpAdapter {
  public static transformAPIResponseToOutcome(data: IOutcomeApi): IOutcome {
    return {
      resultId: data.attributes.result_id,
      resultType: data.attributes.result_type,
      probability: data.attributes.probability,
    };
  }
}
