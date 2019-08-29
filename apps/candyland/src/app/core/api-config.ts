export class ApiConfig {
  public static basePath: string = 'https://api.whistler.perxtech.org/';
  public static baseAPIPath: string = `${ApiConfig.basePath}iam/`;
  public static engagementsPath =  `${ApiConfig.basePath}engagements/`;
  public static rewardsPath =  `${ApiConfig.basePath}reward/entities/`;
  public static createGamePath = `${ApiConfig.basePath}engagements/`;
  public static getAllCredentialPath = `${ApiConfig.baseAPIPath}credentials`;
  public static IAMUsersPath = `${ApiConfig.baseAPIPath}users`;
  public static IAMGroupsPath = `${ApiConfig.baseAPIPath}groups`;
  public static baseAPIUserPath: string = `${ApiConfig.basePath}cognito/`;
  public static getAllUsers = `${ApiConfig.baseAPIUserPath}users`;
}
