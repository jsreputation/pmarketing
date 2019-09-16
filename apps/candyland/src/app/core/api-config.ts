import { environment } from '@cl-environments/environment';

export class ApiConfig {
  public static basePath: string = environment.apiHost;
  // public static basePath: string = 'https://api.whistler.perxtech.org';
  // public static basePath: string = 'http://708f54de.ngrok.io/';
  public static baseAPIPath: string = `${ApiConfig.basePath}iam/`;
  public static engagementsPath = `${ApiConfig.basePath}/engagements/`;
  public static campaignsPath = `${ApiConfig.basePath}campaign/entities/`;
  public static rewardsPath = `${ApiConfig.basePath}/reward/entities/`;
  public static createGamePath = `${ApiConfig.basePath}/engagements/`;
  public static getAllCredentialPath = `${ApiConfig.baseAPIPath}/credentials`;
  public static IAMUsersPath = `${ApiConfig.baseAPIPath}users`;
  public static IAMGroupsPath = `${ApiConfig.baseAPIPath}/groups`;
  public static baseAPIUserPath: string = `${ApiConfig.basePath}cognito/`;
  public static getAllUsers = `${ApiConfig.baseAPIUserPath}/users`;
  public static getAudiences = `${ApiConfig.baseAPIUserPath}/pools`;
  public static signIn = `${ApiConfig.IAMUsersPath}/sign_in`;
  public static stampsPath = `${ApiConfig.engagementsPath}`;
  public static vouchersPath = `${ApiConfig}vouchers/batches`;
}
