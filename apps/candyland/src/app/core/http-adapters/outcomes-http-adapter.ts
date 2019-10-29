import { IOutcomeAttributes } from '@perx/whistler';
import { IOutcome } from '@cl-core/models/outcome/outcome';

export class OutcomesHttpAdapter {
  public static transformAPIResponseToOutcome(data: IJsonApiItem<IOutcomeAttributes>): IOutcome {
    return {
      id: data.id,
      resultId: data.attributes.result_id,
      resultType: data.attributes.result_type,
      probability: data.attributes.probability ? data.attributes.probability * 100 : null,
      lootBoxId: data.attributes.loot_box_id,
    };
  }

  public static transformFromOutcomes(
    data: any,
    enableProbability: boolean,
    campaignId: string,
    slotNumber: number
  ): IJsonApiItem<IOutcomeAttributes> {
    return {
      type: 'possible_outcomes',
      attributes: {
        result_id: data.id,
        result_type: 'Perx::Reward::Entity',
        probability: enableProbability ? data.probability / 100 : null,
        loot_box_id: slotNumber,
        no_outcome: !data.id,
        campaign_entity_id: campaignId && parseInt(campaignId, 10)
      }
    };
  }
}
