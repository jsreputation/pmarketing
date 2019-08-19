import { environment } from '@cl-environments/environment';

export class ConfigPathService {
  public static basePath: string = environment.basePath;
  public static engagementsPath =  `${ConfigPathService.basePath}engagements`;
  public static createGamePath = `${ConfigPathService.basePath}engagements`;
}
