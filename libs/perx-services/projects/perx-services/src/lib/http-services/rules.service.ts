import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPTriggers, IPPostTrigger, IPPostTriggerResponse } from '@perx/model';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../configs/api-config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { }

  public getTriggers(): Observable<IPTriggers> {
    return this.http.get<IPTriggers>(`${this.apiConfig.baseApiPath}/v4/dash/automation/app_triggers`);
  }

  public postTrigger(req: IPPostTrigger): Observable<IPPostTriggerResponse> {
    return this.http.post<IPPostTriggerResponse>(`${this.apiConfig.baseApiPath}/v4/dash/automation/app_triggers`, req);
  }

  public deleteTrigger(id: number): Observable<void> {
    return this.http.delete(`${this.apiConfig.baseApiPath}/v4/dash/automation/app_triggers/${id}`)
      .pipe(map(() => (void 0)));
  }

  public putTrigger(req: IPPostTrigger, id: number): Observable<IPPostTriggerResponse> {
    return this.http.put<IPPostTriggerResponse>(`${this.apiConfig.baseApiPath}/v4/dash/automation/app_triggers/${id}`, req);
  }
}
