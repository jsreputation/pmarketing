import { IOutcomeAttributes, IOutcome } from '@perx/whistler';
import { IJsonApiItem } from '@cl-core/http-services/jsonapi.payload';

export class OutcomesHttpAdapter {
  public static transformAPIResponseToOutcome(data: IJsonApiItem<IOutcomeAttributes>): IOutcome {
    return {
      resultId: data.attributes.result_id,
      resultType: data.attributes.result_type,
      probability: data.attributes.probability,
    };
  }
}
