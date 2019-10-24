import { IOutcomeAttributes } from '@perx/whistler';
import { IOutcome } from '@cl-core/models/outcome/outcome';

export class OutcomesHttpAdapter {
  public static transformAPIResponseToOutcome(data: IJsonApiItem<IOutcomeAttributes>): IOutcome {
    return {
      id: data.id,
      resultId: data.attributes.result_id,
      resultType: data.attributes.result_type,
      probability: data.attributes.probability,
      lootBoxId: data.attributes.loot_box_id,
    };
  }

  public static transformFromOutcomes(data: IOutcome): IJsonApiItem<IOutcomeAttributes> {
    return {
      type: 'possible_outcomes',
      attributes: {
        result_id: data.resultId,
        result_type: data.resultType,
        probability: data.probability,
        loot_box_id: data.lootBoxId,
      }
    };
  }
}
