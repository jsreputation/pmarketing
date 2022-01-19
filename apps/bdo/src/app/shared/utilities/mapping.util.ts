import { ICampaign, IReward } from '@perxtech/core';
import { IListItemModel } from '../models/list-item.model';

export function mapRewardsToListItem(rewards: IReward[]): IListItemModel[] {
  return rewards.map((reward) => {
   return mapRewardToListItem(reward);
  });
}

export function mapRewardToListItem(reward: IReward): IListItemModel {
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
    score: reward.score
  };
}

export function mapCampaignsToListItem(campaigns: ICampaign[]): IListItemModel[] {
  return campaigns.map((campaign) => {
    return mapCampaignToListItem(campaign);
  });
}

export function mapCampaignToListItem(campaign: ICampaign): IListItemModel {
  return {
    id: campaign.id,
    thumbnail: campaign.thumbnailUrl,
    categoryTags: campaign.categoryTags,
    name: campaign.name,
    description: campaign.displayProperties?.landingPage?.subHeadline || campaign.displayProperties?.landingPage?.subHeading.text,
    documentType: 'campaign',
    createdAt: campaign.beginsAt,
    tags: campaign.tags,
    score: campaign.score
  };
}