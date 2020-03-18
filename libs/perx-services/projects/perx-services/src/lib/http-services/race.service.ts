import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../configs/api-config';
import { Observable } from 'rxjs';
import { IPRaces } from '@perxtech/model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { }

  public getRaces(): Observable<IPRaces> {
    return this.http.get<IPRaces>(`${this.apiConfig.baseApiPath}/v4/dash/simple/personal_property_mappings/race`);
  }
}
