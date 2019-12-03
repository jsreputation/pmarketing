import { ICampaignOutcome } from '@cl-core/models/campaign/campaign.interface';
import { IWOutcomeAttributes } from '@perx/whistler';
import { IOutcome } from '@cl-core/models/outcome/outcome';

export class OutcomesHttpAdapter {
  public static transformAPIResponseToOutcome(data: IJsonApiItem<IWOutcomeAttributes>): IOutcome {
    return {
      id: data.id,
      resultId: data.attributes.result_id,
      resultType: data.attributes.result_type,
      probability: data.attributes.probability ? data.attributes.probability * 100 : null,
      slotNumber: data.attributes.loot_box_id,
      limit: data.attributes.max_issuance_per_campaign || null
    };
  }

  public static transformFromOutcomes(
    data: ICampaignOutcome,
    campaignId: string,
  ): IJsonApiItem<IWOutcomeAttributes> {
    return {
      type: 'possible_outcomes',
      attributes: {
        result_id: data && parseInt(data.outcome.id, 10),
        result_type: 'Perx::Reward::Entity',
        probability: data.enableProbability ? data.outcome.probability / 100 : null,
        loot_box_id: data.outcome.slotNumber,
        no_outcome: !data.outcome.id,
        campaign_entity_id: campaignId && parseInt(campaignId, 10),
        max_issuance_per_campaign: data.outcome.limit || null
      }
    };
  }
}
