import { Inject, Injectable } from '@angular/core';
import { BASE_CDN_URL_WS, BASE_URL_WS } from '../http-services/http-services.module';

@Injectable()
export class ApiConfigServices {

  constructor(
    @Inject(BASE_URL_WS) public baseApiPath: string,
    @Inject(BASE_CDN_URL_WS) public baseCDNPath: string,
              ) {
  }

  public get baseAPIPath(): string {
    return `${this.baseApiPath}/iam`;
  }

  public get engagementsPath(): string {
    return `${this.baseApiPath}/engagements`;
  }

  public get campaignsPath(): string {
    return `${this.baseApiPath}/campaign/entities`;
  }

  public get campaignsNotificationPath(): string {
    return `${this.baseApiPath}/campaign/notifications`;
  }

  public get commsTemplatesPath(): string {
    return `${this.baseApiPath}/comm/templates`;
  }

  public get commsEventsPath(): string {
    return `${this.baseApiPath}/comm/events`;
  }

  public get commsMessagesPath(): string {
    return `${this.baseApiPath}/comm/messages`;
  }

  public get outcomesPath(): string {
    return `${this.baseApiPath}/outcome/possible_outcomes`;
  }

  public get rewardsPath(): string {
    return `${this.baseApiPath}/reward/entities`;
  }

  public get rewardsTierPath(): string {
    return `${this.baseApiPath}/reward/tier_reward_costs`;
  }

  public get allCredentialPath(): string {
    return `${this.baseAPIPath}/credentials`;
  }

  public get IAMUsersPath(): string {
    return `${this.baseAPIPath}/users`;
  }

  public get IAMGroupsPath(): string {
    return `${this.baseAPIPath}/groups`;
  }

  public get baseAPIUserPath(): string {
    return `${this.baseApiPath}/cognito`;
  }

  public get cognitoEndpoints(): string {
    return `${this.baseApiPath}/cognito/endpoints`;
  }

  public get getAllUsers(): string {
    return `${this.baseAPIUserPath}/users`;
  }

  public get getAudiences(): string {
    return `${this.baseAPIUserPath}/pools`;
  }

  public get signIn(): string {
    return `${this.IAMUsersPath}/sign_in`;
  }

  public get stampsPath(): string {
    return `${this.engagementsPath}`;
  }

  public get voucherBatchPath(): string {
    return `${this.baseApiPath}/voucher-service/batch`;
  }

  public get vouchersEntitiesPath(): string {
    return `${this.baseApiPath}/voucher-service/entities`;
  }

  public get vouchersAssignedPath(): string {
    return `${this.baseApiPath}/voucher-service/vouchers`;
  }

  public get tenantsPath(): string {
    return `${this.baseAPIPath}/tenants`;
  }

  public get merchantsPath(): string {
    return `${this.baseApiPath}/organization`;
  }

  public get uploadImagePath(): string {
    return `${this.baseApiPath}/storage/images`;
  }

  public get uploadFilePath(): string {
    return `${this.baseApiPath}/storage/documents`;
  }

  public get apiCdnPath(): string {
    return `${this.baseCDNPath || 'https://cdn.uat.whistler.perxtech.io/dev1/'}`;
  }

  public get reportPath(): string {
    return `${this.baseApiPath}/report`;
  }

  public get loyaltyPath(): string {
    return `${this.baseApiPath}/loyalty/programs`;
  }

  public get loyaltyBasicTierPath(): string {
    return `${this.baseApiPath}/loyalty/basic_tiers`;
  }

  public get getLoyaltyCustomTierPath(): string {
    return `${this.baseApiPath}/loyalty/custom_tiers`;
  }

  public get getLoyaltyRuleSetPath(): string {
    return `${this.baseApiPath}/outcome/rule_sets`;
  }

  public get getLoyaltyRulePath(): string {
    return `${this.baseApiPath}/outcome/rules`;
  }

  public get getLoyaltyRuleConditionPath(): string {
    return `${this.baseApiPath}/outcome/rule_conditions`;
  }

  public get getLoyaltyRulePointsCalculator(): string {
    return `${this.baseApiPath}/loyalty/point_calculators`;
  }
}
