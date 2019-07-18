interface IEnvironment {
  [key: string]: string | number | boolean;
}

export class EnvConfig {
  // defaults
  public env: IEnvironment = {
    apiHost: 'https://api.perxtech.io'
  };
}
