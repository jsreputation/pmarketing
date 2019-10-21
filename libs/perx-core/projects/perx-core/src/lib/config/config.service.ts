import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IConfig} from './models/config.model';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Config} from './config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) {

  }

  private static configToIConfig(conf: Config): IConfig {
    return {
      apiHost: conf.apiHost,
      preAuth: conf.preAuth,
      isWhistler: conf.isWhistler,
      baseHref: conf.baseHref,
      defaultLang: conf.defaultLang,
      storageType: conf.storageType
    };
  }

  public readAppConfig(): Observable<IConfig> {
    return this.http.get('assets/config/app-config.json').pipe(
      map((appConf: Config) => ConfigService.configToIConfig(appConf))
    );
  }

}
