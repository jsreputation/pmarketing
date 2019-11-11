/*
* Public API Surface of whistler
*/
export * from './lib/whistler.module';
export { IWVoucherStatsApi } from './lib/voucher/stats';
export { IWVouchersApi } from './lib/voucher/vouchers-api';
export {
  WAssignedStatus,
  IWAssignedAttributes,
  IWAssignRequestAttributes,
} from './lib/voucher/assigneds';
export { IWRewardEntityAttributes } from './lib/reward/reward';
export {
  IWInstantOutcomeLimitAttributes,
  IWSurveyLimitAttributes,
  IWGameLimitAttributes,
} from './lib/limit/limit';
export { IWOutcomeAttributes } from './lib/outcome/outcome';
export {
  IWCommTemplateAttributes,
  IWCommEventAttributes,
} from './lib/comm/comm';
export { IWCampaignAttributes } from './lib/campaign/campaign';
export { WEngagementType } from './lib/campaign/campaign';
export { IWAudiences, IWPoolsApi, IWPools, IWUser } from './lib/audiences/audiences.model';

export {
  IWJsonApiListPayload, IWJsonApiItemPayload, IWMeta, IWJsonApiItem,
  IWJsonApiPatchItem, IWJsonApiPatchData, IWJsonApiPostItem, IWJsonApiPostData
} from './lib/jsonapi.payload';

export {
  IWInstantOutcomeTransactionAttributes,
  IWInstantOutcomeTxnReq,
} from './lib/instant-outcome/transaction';
export {
  IWInstantOutcomeEngagementAttributes,
  IWOutcomeDisplayProperties,
} from './lib/instant-outcome/engagement';
export { IWProfileAttributes } from './lib/profile/profile';
export {
  IWMerchant,
  IWMerchantBranchApi,
} from './lib/merchant/merchant';
export { IWTenantProperties } from './lib/settings/tenant';
export { IWTimeZone } from './lib/settings/time-zone';
export {
  IWLoyalty,
  IWLoyaltyCard,
} from './lib/loyalty/loyalty';

export {
  WGameType,
  IWAttbsObjGame,
  IWAttbsObjEntity,
  IWGameDisplayProperties,
  IWTreeDisplayProperties,
  IWPinataDisplayProperties,
  IWScratchDisplayProperties
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

/** Cognito */
export { IWCognitoTenantAttributes } from './lib/cognito/tenants';
