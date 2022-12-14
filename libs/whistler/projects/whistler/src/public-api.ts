/**
 * Public API Surface of whistler
 */
export {
  IJsonApiListPayload,
  IMeta,
  IJsonApiItemPayload,
  IJsonApiItem,
  IJsonApiPatchItem,
  IJsonApiPatchData,
  IJsonApiPostItem,
  IJsonApiPostData,
  IWRelationshipsDataType,
  relationshipsDataToArray,
  relationshipsDataToItem
} from './lib/jsonapi.payload';
export { IWRewardDisplayProperties, IWProperties } from './lib/whistler.models';

export { IWVoucherStatsApi } from './lib/voucher/stats';
export { IWVouchersApi, WCodeType, WStatus } from './lib/voucher/vouchers-api';
export {
  WAssignedStatus,
  IWAssignedAttributes,
  IWPurchaseAttributes,
  IWAssignRequestAttributes
} from './lib/voucher/assigneds';
export {
  IWDocumentAttributes,
  IWDocumentBlob,
  WFileUploadStatus
} from './lib/storage/documents';
export {
  IWRewardEntityAttributes,
  IWMetaData,
  IWTierRewardCostsAttributes,
  WRedemptionType
} from './lib/reward/reward';
export { IWAttbsObjTrans } from './lib/game/game';
export {
  IWInstantOutcomeLimitAttributes,
  IWSurveyLimitAttributes,
  IWGameLimitAttributes,
  IWLimitAttributes
} from './lib/limit/limit';
export {
  IWOutcomeAttributes,
  IWCampaignProperties,
} from './lib/outcome/outcome';
export { IWAttbsObjStamp } from './lib/stamp/stamp';
export {
  IWCommTemplateAttributes,
  IWCommEventAttributes,
  IWCommMessageAttributes,
  WMessageChannel
} from './lib/comm/comm';
export {
  IWCampaignAttributes,
  IWCampaignDisplayProperties,
  WInformationCollectionSettingType,
  WCampaignStatus,
  IWAudienceFilter
} from './lib/campaign/campaign';

export { IWNotificationAttributes } from './lib/campaign/notification';
export {
  IWAudiences,
} from './lib/audiences/audiences.model';
export {
  IWProfileAttributes,
  IWCustomProperties,
  IWCognitoLogin,
  IWUserJWTRequest,
} from './lib/profile/profile';
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
  IWJoinMethod,
  IWLoyaltyRuleSetAttributes,
  IWLoyaltyRuleAttributes,
  IWLoyaltyRuleConditionValueType,
  IWLoyaltyRuleConditionSign,
  IWLoyaltyRuleConditionAttributes,
  IWLoyaltyRulePointApplierType,
  IWLoyaltyRulePointAttributes
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
  IWScratchGameEngagementAttributes,
  IWSpinGameEngagementAttributes,
  IWSnakeGameEngagementAttributes
} from './lib/engagement/engagement';
export {
  WGameType,
  IWGameDisplayProperties,
  IWTreeDisplayProperties,
  IWPinataDisplayProperties,
  IWScratchDisplayProperties,
  IWSpinDisplayProperties,
  IWSnakeDisplayProperties
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
export { IWCognitoTenantAttributes, IWCognitoEndpointAttributes } from './lib/cognito/tenants';

export { IWSetting, IWTenant, IWAccountPageObject, IWPagesObject } from './lib/tenant/settings';
