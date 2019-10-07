import { IOutcomeAttributes, IOutcome } from '@perx/whistler';

export class OutcomesHttpAdapter {
  public static transformAPIResponseToOutcome(data: IJsonApiItem<IOutcomeAttributes>): IOutcome {
    return {
      resultId: data.attributes.result_id,
      resultType: data.attributes.result_type,
      probability: data.attributes.probability,
    };
  }
}
