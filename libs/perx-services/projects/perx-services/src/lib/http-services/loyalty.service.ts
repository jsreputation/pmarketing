import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../configs/api-config';
import { Observable } from 'rxjs';
import { IPLoyalty } from '@perx/model';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { }

  public getLoyalties(): Observable<IPLoyalty> {
    return this.http.get<IPLoyalty>(`${this.apiConfig.baseApiPath}/v4/dash/simple/loyalty`);
  }
}
