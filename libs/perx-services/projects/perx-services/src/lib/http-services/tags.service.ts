import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../configs/api-config';
import { Observable } from 'rxjs';
import { IPTags, IPPostTag, IPPostTagResponse, IPTag } from '@perx/model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { }

  public getTags(): Observable<IPTags> {
    return this.http.get<IPTags>(`${this.apiConfig.baseApiPath}/v4/dash/simple/tags`);
  }

  public postTag(obj: IPPostTag): Observable<IPPostTagResponse> {
    return this.http.post<IPPostTagResponse>(`${this.apiConfig.baseApiPath}/v4/dash/tags`, obj);
  }

  public deleteTag(id: number): Observable<void> {
    return this.http.delete<IPPostTagResponse>(`${this.apiConfig.baseApiPath}/v4/dash/tags/${id}`)
      .pipe(map(() => (void 0)));
  }

  public putTag(obj: IPTag): Observable<IPPostTagResponse> {
    return this.http.post<IPPostTagResponse>(`${this.apiConfig.baseApiPath}/v4/dash/tags/${obj.id}`, obj);
  }
}
