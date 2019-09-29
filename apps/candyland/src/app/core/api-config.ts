import { environment } from '@cl-environments/environment';

export class ApiConfig {
  public static basePath: string = environment.apiHost;
  public static baseAPIPath: string = `${ApiConfig.basePath}/iam`;
  public static engagementsPath = `${ApiConfig.basePath}/engagements`;
  public static campaignsPath = `${ApiConfig.basePath}/campaign/entities`;
  public static rewardsPath = `${ApiConfig.basePath}/reward/entities`;
  public static getAllCredentialPath = `${ApiConfig.baseAPIPath}/credentials`;
  public static IAMUsersPath = `${ApiConfig.baseAPIPath}/users`;
  public static IAMGroupsPath = `${ApiConfig.baseAPIPath}/groups`;
  public static baseAPIUserPath: string = `${ApiConfig.basePath}/cognito`;
  public static getAllUsers = `${ApiConfig.baseAPIUserPath}/users`;
  public static getAudiences = `${ApiConfig.baseAPIUserPath}/pools`;
  public static signIn = `${ApiConfig.IAMUsersPath}/sign_in`;
  public static stampsPath = `${ApiConfig.engagementsPath}`;
  public static voucherBatchPath = `${ApiConfig.basePath}/voucher/batch`;
  public static vouchersPath = `${ApiConfig.basePath}/vouchers/batches`;
  public static vouchersEntitiesPath = `${ApiConfig.basePath}/voucher/entities`;
  public static vouchersAssignedPath = `${ApiConfig.basePath}/voucher/assigneds`;
  public static tenantsPath = `${ApiConfig.baseAPIPath}/tenants`;
  public static merchantsPath = `${ApiConfig.basePath}/organization`;
  public static uploadFilePath = `${ApiConfig.basePath}/storage/images`;
  public static apiCdnPath = `${environment.apiCdn || 'https://cdn.uat.whistler.perxtech.io/dev1/'}`;
}
