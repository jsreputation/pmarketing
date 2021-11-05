import { ICampaign, IReward } from '@perxtech/core';
import { IListItemModel } from '../models/list-item.model';

export function mapRewardsToListItem(rewards: IReward[]): IListItemModel[] {
  return rewards.map((reward) => {
    return {
      id: reward.id,
      thumbnail: reward.rewardThumbnail,
      categoryTags: reward.categoryTags,
      name: reward.name,
      description: reward.subtitle,
      createdAt: reward.validFrom,
      documentType: 'reward',
      position: reward?.distance?.value ? `${reward.distance.value} ${reward?.distance?.unitOfMeasure}` : ''
    };
  });
}

export function mapCampaignsToListItem(campaigns: ICampaign[]): IListItemModel[] {
  return campaigns.map((campaign) => {
    return {
      id: campaign.id,
      thumbnail: campaign.thumbnailUrl,
      categoryTags: campaign.categoryTags,
      name: campaign.name,
      description: campaign.displayProperties?.landingPage?.subHeadline,
      documentType: 'campaign',
      createdAt: campaign.beginsAt,
    };
  });
}
