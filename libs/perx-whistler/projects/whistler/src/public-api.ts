/*
* Public API Surface of whistler
*/
export * from './lib/whistler.module';
export { IWVoucherStatsApi } from './lib/voucher/stats';
export { IWVouchersApi } from './lib/voucher/vouchers-api';
export {
  WAssignedStatus,
  IWAssignedAttributes,
  IWAssignRequestAttributes
} from './lib/voucher/assigneds';
export { IWRewardEntityAttributes } from './lib/reward/reward';
export {
  IWInstantOutcomeLimitAttributes,
  IWSurveyLimitAttributes,
  IWGameLimitAttributes,
  IWLimitAttributes
} from './lib/limit/limit';
export { IWOutcomeAttributes } from './lib/outcome/outcome';
export {
  IWCommTemplateAttributes,
  IWCommEventAttributes
} from './lib/comm/comm';
export { IWCampaignAttributes } from './lib/campaign/campaign';
export { IWAudiences, IWPoolsApi, IWPools, IWUser } from './lib/audiences/audiences.model';
export {
  IWJsonApiListPayload, IWJsonApiItemPayload, IWMeta, IWJsonApiItem,
  IWJsonApiPatchItem, IWJsonApiPatchData, IWJsonApiPostItem, IWJsonApiPostData
} from './lib/jsonapi.payload';

export { IWProfileAttributes, IWPoolsAttributes } from './lib/profile/profile';

export {
  IWMerchantAttributes,
  IWMerchantBranchAttributes
} from './lib/merchant/merchant';
export {
  IWTenantAttributes,
  IWTenantDisplayProperties,
  IWAccountPageItem,
  IWAccountPage
} from './lib/settings/tenant';
export { IWIAMUserAttributes } from './lib/settings/user';
export { IWTimeZone } from './lib/settings/time-zone';
export {
  IWLoyalty,
  IWLoyaltyCard,
  IWLoyaltyAttributes,
  IWBasicTierAttributes,
  IWCustomTierAttributes,
  IWJoinMethod
} from './lib/loyalty/loyalty';

export {
  IWMessageResponse,
  IWAppAccessTokenResponse,
  IWLoginResponse,
  IWLoginAttributes
} from './lib/authentication/authentication';

export {
  WEngagementType,
  IWEngagementProperties,
  IWEngagementAttributes,
  IWGameEngagementAttributes,
  IWTreeGameEngagementAttributes,
  IWPinataGameEngagementAttributes,
  IWInstantOutcomeEngagementAttributes,
  IWSurveyEngagementAttributes,
  IWStampEngagementAttributes,
  IWScratchGameEngagementAttributes
} from './lib/engagement/engagement';

export {
  WGameType,
  IWGameDisplayProperties,
  IWTreeDisplayProperties,
  IWPinataDisplayProperties,
  IWScratchDisplayProperties
} from './lib/engagement/games';

export {
  IWInstantOutcomeDisplayProperties
} from './lib/engagement/instant-outcome';

export {
  IWInstantOutcomeTransactionAttributes,
  IWInstantOutcomeTxnReq,
  WInstantOutcomeStatus
} from './lib/engagement/instant-outcome-transaction';

/** Survey */
export {
  IWSurveyDisplayProperties,
  IWPostAnswerAttributes,
  IWOutcomes
} from './lib/engagement/survey';

export {
  IWQuestion,
  IWPayload,
  WSurveyQuestionType
} from './lib/engagement/survey-question';

export {
  IWStampDisplayProperties
} from './lib/engagement/stamp';

/** Cognito */
export { IWCognitoTenantAttributes } from './lib/cognito/tenants';
