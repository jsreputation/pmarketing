import { IOutcomeAttributes } from '@perx/whistler';
import { IOutcome } from '@cl-core/models/outcome/outcome';

export class OutcomesHttpAdapter {
  public static transformAPIResponseToOutcome(data: IJsonApiItem<IOutcomeAttributes>): IOutcome {
    return {
      id: data.id,
      resultId: data.attributes.result_id,
      resultType: data.attributes.result_type,
      probability: data.attributes.probability * 100,
      lootBoxId: data.attributes.loot_box_id,
    };
  }

  public static transformFromOutcomes(data: IOutcome, enableProbability: boolean): IJsonApiItem<IOutcomeAttributes> {
    return {
      type: 'possible_outcomes',
      attributes: {
        result_id: data.resultId,
        result_type: data.resultType,
        probability: enableProbability ? data.probability / 100 : null,
        loot_box_id: data.lootBoxId,
        no_outcome: !data.resultId,
      }
    };
  }
}
