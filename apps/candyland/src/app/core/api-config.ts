import { environment } from '@cl-environments/environment';

export class ApiConfig {
  public static basePath: string = environment.apiHost;
  public static baseAPIPath: string = `${ApiConfig.basePath}/iam`;
  public static engagementsPath: string = `${ApiConfig.basePath}/engagements`;
  public static campaignsPath: string = `${ApiConfig.basePath}/campaign/entities`;
  public static commsTemplatesPath: string = `${ApiConfig.basePath}/comm/templates`;
  public static commsEventsPath: string = `${ApiConfig.basePath}/comm/events`;
  public static outcomesPath: string = `${ApiConfig.basePath}/outcome/possible_outcomes`;
  public static rewardsPath: string = `${ApiConfig.basePath}/reward/entities`;
  public static allCredentialPath: string = `${ApiConfig.baseAPIPath}/credentials`;
  public static IAMUsersPath: string = `${ApiConfig.baseAPIPath}/users`;
  public static IAMGroupsPath: string = `${ApiConfig.baseAPIPath}/groups`;
  public static baseAPIUserPath: string = `${ApiConfig.basePath}/cognito`;
  public static getAllUsers: string = `${ApiConfig.baseAPIUserPath}/users`;
  public static getAudiences: string = `${ApiConfig.baseAPIUserPath}/pools`;
  public static signIn: string = `${ApiConfig.IAMUsersPath}/sign_in`;
  public static stampsPath: string = `${ApiConfig.engagementsPath}`;
  public static voucherBatchPath: string = `${ApiConfig.basePath}/voucher-service/batch`;
  // public static vouchersPath: string = `${ApiConfig.basePath}/vouchers/batches`;
  public static vouchersEntitiesPath: string = `${ApiConfig.basePath}/voucher-service/entities`;
  public static vouchersAssignedPath: string = `${ApiConfig.basePath}/voucher-service/vouchers`;
  public static tenantsPath: string = `${ApiConfig.baseAPIPath}/tenants`;
  public static merchantsPath: string = `${ApiConfig.basePath}/organization`;
  public static uploadImagePath: string = `${ApiConfig.basePath}/storage/images`;
  public static uploadFilePath: string = `${ApiConfig.basePath}/storage/documents`;
  public static apiCdnPath: string = `${environment.apiCdn || 'https://cdn.uat.whistler.perxtech.io/dev1/'}`;
  public static reportPath: string = `${ApiConfig.basePath}/report`;
  public static loyaltyPath: string = `${ApiConfig.basePath}/loyalty/programs`;
  public static loyaltyBasicTierPath: string = `${ApiConfig.basePath}/loyalty/basic_tiers`;
  public static getLoyaltyCustomTierPath: string = `${ApiConfig.basePath}/loyalty/custom_tiers`;
  public static getLoyaltyRuleSetPath: string = `${ApiConfig.basePath}/outcome/rule_sets`;
  public static getLoyaltyRulePath: string = `${ApiConfig.basePath}/outcome/rules`;
  public static getLoyaltyRuleConditionPath: string = `${ApiConfig.basePath}/outcome/rule_conditions`;
}
