import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IConfig, IMicrositeSettings } from './models/config.model';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WhistlerConfigService extends ConfigService {
  constructor( private http: HttpClient ) {
    super();
  }
  public readAppConfig(): Observable<IConfig> {
    return this.http.get<IConfig>('assets/config/app-config.json');
  }

  public getTenantAppSettings(): Observable<IMicrositeSettings> {
    return of();
  }
}
