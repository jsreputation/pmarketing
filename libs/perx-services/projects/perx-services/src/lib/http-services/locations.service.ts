import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../configs/api-config';
import { Observable } from 'rxjs';
import { IPCities, IPStates } from '@perx/model';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { }

  public getCities(): Observable<IPCities> {
    return this.http.get<IPCities>(`${this.apiConfig.baseApiPath}/v4/dash/simple/personal_property_mappings/cities`);
  }

  public getStates(): Observable<IPStates> {
    return this.http.get<IPStates>(`${this.apiConfig.baseApiPath}/v4/dash/simple/personal_property_mappings/states`);
  }
}
