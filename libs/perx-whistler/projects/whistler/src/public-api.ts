/*
* Public API Surface of whistler
*/

export * from './lib/whistler.module';
export * from './lib/jsonapi.payload';
export * from './lib/whistler.models';

export { IWVoucherStatsApi } from './lib/voucher/stats';
export { IWVouchersApi } from './lib/voucher/vouchers-api';
export {
  WAssignedStatus,
  IWAssignedAttributes,
  IWAssignRequestAttributes,
} from './lib/voucher/assigneds';
export {
  IWRewardEntityAttributes,
  IWMetaData,
} from './lib/reward/reward';
export {
  IWInstantOutcomeLimitAttributes,
  IWSurveyLimitAttributes,
  IWGameLimitAttributes,
} from './lib/limit/limit';
export {
  IWOutcomeAttributes,
  IWCampaignProperties,
} from './lib/outcome/outcome';
export { IWAttbsObjStamp } from './lib/stamp/stamp';
export {
  IWCommTemplateAttributes,
  IWCommEventAttributes,
} from './lib/comm/comm';
export {
  IWCampaignAttributes,
  WEngagementType,
} from './lib/campaign/campaign';
export {
  IWInstantOutcomeTransactionAttributes,
  IWInstantOutcomeTxnReq,
} from './lib/instant-outcome/transaction';
export {
  IWInstantOutcomeEngagementAttributes,
  IWOutcomeDisplayProperties,
} from './lib/instant-outcome/engagement';
export {
  IWProfileAttributes,
  IWCognitoLogin,
  IWUserJWTRequest,
} from './lib/profile/profile';
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
  IWGameDisplayProperties,
  IWTreeDisplayProperties,
  IWPinataDisplayProperties,
  IWAttbsObjTrans,
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
