/*
* Public API Surface of whistler
*/

export * from './lib/whistler.module';
export { IVoucherStatsApi } from './lib/voucher/stats';
export { IVouchersApi } from './lib/voucher/vouchers-api';
export { AssignedStatus, IAssignedAttributes, IAssignRequestAttributes } from './lib/voucher/assigneds';
export { IRewardEntityAttributes } from './lib/reward/reward';
export { IInstantOutcomeLimitAttributes, ISurveyLimitAttributes, IGameLimitAttributes } from './lib/limit/limit';
export { IOutcomeAttributes } from './lib/outcome/outcome';
export { ICommTemplateAttributes, ICommEventAttributes } from './lib/comm/comm';
export { ICampaignAttributes } from './lib/campaign/campaign';
export { WEngagementType } from './lib/campaign/campaign';
export { IInstantOutcomeTransactionAttributes, IInstantOutcomeTxnReq } from './lib/instant-outcome/transaction';
export { IWInstantOutcomeEngagementAttributes, IWOutcomeDisplayProperties } from './lib/instant-outcome/engagement';
export { IWhistlerProfileAttributes } from './lib/profile/profile';
export { IMerchant, IMerchantBranchApi } from './lib/merchant/merchant';
export { ITenantProperties } from './lib/settings/tenant';

export {
  IJsonApiListPayload, IJsonApiItemPayload, IMeta, IJsonApiItem,
  IJsonApiPatchItem, IJsonApiPatchData, IJsonApiPostItem, IJsonApiPostData
} from './lib/jsonapi.payload';
export { ITimeZone } from './lib/settings/time-zone';
export { ILoyalty, ILoyaltyCard } from './lib/loyalty/loyalty';

export {
  WGameType,
  WAttbsObjGame,
  WAttbsObjEntity,
  WGameDisplayProperties,
  WTreeDisplayProperties,
  WPinataDisplayProperties
} from './lib/game/game';

/** Survey */
export {
  IWSurveyAttributes,
  IWSurveyProperties,
  IWSurveyDisplayProperties,
  IWPostAnswerAttributes,
  IWOutcomes
} from './lib/survey/survey';
export {
  IWQuestion,
  IWPayload,
  WSurveyQuestionType
} from './lib/survey/question';
