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
      createdAt: reward.sellingFrom,
      documentType: 'reward',
      position: reward?.distance?.value ? reward.distance.value.toString() : '',
      tags: reward.tags,
      score: reward.score,
      featuredImg: reward.miscImages.miscImage1
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
      description: campaign.displayProperties?.landingPage?.subHeadline || campaign.displayProperties?.landingPage?.subHeading.text,
      documentType: 'campaign',
      createdAt: campaign.beginsAt,
      tags: campaign.tags,
      score: campaign.score,
      featuredImg: campaign.miscImages.miscImage1
    };
  });
}
