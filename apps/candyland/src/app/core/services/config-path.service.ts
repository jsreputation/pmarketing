export class ConfigPathService {
  public static basePath: string = 'https://api.whistler.perxtech.org/';
  public static baseAPIPath: string = `${ConfigPathService.basePath}iam/`;
  public static engagementsPath =  `${ConfigPathService.basePath}engagements/`;
  public static createGamePath = `${ConfigPathService.basePath}engagements/`;
  public static getAllCredentialPath = `${ConfigPathService.baseAPIPath}credentials`;

  public static baseAPIUserPath: string = `${ConfigPathService.basePath}cognito/`;
  public static getAllUsers = `${ConfigPathService.baseAPIUserPath}users`;
}
