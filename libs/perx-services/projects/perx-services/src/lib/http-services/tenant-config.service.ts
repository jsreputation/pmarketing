import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../configs/api-config';
import { Observable } from 'rxjs';
import { IPTenantConfig } from '@perxtech/model';

@Injectable({
  providedIn: 'root'
})
export class TenantConfigService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { }

  public getTenantConfig(): Observable<IPTenantConfig> {
    return this.http.get<IPTenantConfig>(`${this.apiConfig.baseApiPath}/v4/dash/tenant_config`);
  }
}
