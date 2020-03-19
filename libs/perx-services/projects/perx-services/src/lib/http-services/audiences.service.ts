import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../configs/api-config';
import { Observable } from 'rxjs';
import { IPAudiences } from '@perxtech/model';

@Injectable({
  providedIn: 'root'
})
export class AudiencesService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { }

  public getAudiences(): Observable<IPAudiences> {
    return this.http.get<IPAudiences>(`${this.apiConfig.baseApiPath}/v4/dash/simple/audiences`);
  }
}
