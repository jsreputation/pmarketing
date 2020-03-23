import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../configs/api-config';
import { Observable } from 'rxjs';
import { IPLabels } from '@perxtech/model';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { }

  public getLabels(): Observable<IPLabels> {
    return this.http.get<IPLabels>(`${this.apiConfig.baseApiPath}/dash/labels`);
  }
}
