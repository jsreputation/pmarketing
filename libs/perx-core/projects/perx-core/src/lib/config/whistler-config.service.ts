import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IConfig, IMicrositeSettings } from './models/config.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class WhistlerConfigService extends ConfigService {
  public readAppConfig(): Observable<IConfig> {
    return of();
    // throw new Error('WhistlerConfigService readAppConfig Method not implemented.');
  }

  public getTenantAppSettings(): Observable<IMicrositeSettings> {
    return of();
    // throw new Error('WhistlerConfigService readAppConfig Method not implemented.');
  }
}
