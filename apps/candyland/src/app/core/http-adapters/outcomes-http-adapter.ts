import { IWOutcomeAttributes } from '@perx/whistler';
import { IOutcome } from '@cl-core/models/outcome/outcome';

export class OutcomesHttpAdapter {
  public static transformAPIResponseToOutcome(data: IJsonApiItem<IWOutcomeAttributes>): IOutcome {
    return {
      id: data.id,
      resultId: data.attributes.result_id,
      resultType: data.attributes.result_type,
      probability: data.attributes.probability ? data.attributes.probability * 100 : null,
      lootBoxId: data.attributes.loot_box_id,
      limit: data.attributes.max_issuance_per_campaign || 0
    };
  }

  public static transformFromOutcomes(
    data: { value: IRewardEntity, probability: number, limit: number },
    enableProbability: boolean,
    campaignId: string,
    slotNumber: number
  ): IJsonApiItem<IWOutcomeAttributes> {
    return {
      type: 'possible_outcomes',
      attributes: {
        result_id: data.value && parseInt(data.value.id, 10),
        result_type: 'Perx::Reward::Entity',
        probability: enableProbability ? data.probability / 100 : null,
        loot_box_id: slotNumber,
        no_outcome: !data.value.id,
        campaign_entity_id: campaignId && parseInt(campaignId, 10),
        max_issuance_per_campaign: data.limit
      }
    };
  }
}
