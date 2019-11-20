import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IConfig, IMicrositeSettings } from './models/config.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class WhistlerConfigService extends ConfigService {

  public readAppConfig(): Observable<IConfig> {
    throw new Error('WhistlerConfigService readAppConfig Method not implemented.');
  }

  public getTenantAppSettings(): Observable<IMicrositeSettings> {
    throw new Error('WhistlerConfigService readAppConfig Method not implemented.');
  }
}
