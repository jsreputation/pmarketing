import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../configs/api-config';
import { Observable } from 'rxjs';
import { IPTags } from '@perx/model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { }

  public getTags(): Observable<IPTags> {
    return this.http.get<IPTags>(`${this.apiConfig.baseApiPath}/v4/dash/simple/tags`);
  }
}
