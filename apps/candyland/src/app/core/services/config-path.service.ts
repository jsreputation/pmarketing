
export class ConfigPathService {
  public static test = 'localhost:3000/';
  public static basePath: string = 'https://api.whistler.perxtech.org/';
  public static baseAPIPath: string = `${ConfigPathService.basePath}iam/`;
  public static engagementsPath =  `${ConfigPathService.basePath}engagements`;
  public static createGamePath = `${ConfigPathService.basePath}engagements`;
  public static getAllCredentialPath = `${ConfigPathService.baseAPIPath}credentials`;
  public static IAMUsersPath = `${ConfigPathService.baseAPIPath}users`;
  public static IAMGroupsPath = `${ConfigPathService.baseAPIPath}groups`;
}
