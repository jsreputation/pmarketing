import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../configs/api-config';
import { Observable } from 'rxjs';
import { IPRoles, IPPostRole, IPPostRoleResponse } from '@perx/model';
import { map } from 'rxjs/operators';

export interface IRolesQuery {
  page?: number;
  size?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { }

  public getRoles(query?: IRolesQuery): Observable<IPRoles> {
    const params: { [k: string]: string } = {};
    if (query) {
      Object.entries(query).forEach(([k, v]: [string, string]) => params[k] = v);
    }
    return this.http.get<IPRoles>(`${this.apiConfig.baseApiPath}/v4/dash/roles`, { params });
  }

  public postRole(query: IPPostRole): Observable<IPPostRoleResponse> {
    return this.http.post<IPPostRoleResponse>(`${this.apiConfig.baseApiPath}/v4/dash/roles/`, query);
  }

  public deleteRole(id: number): Observable<void> {
    // NL the query param seems very odd
    return this.http.delete(`${this.apiConfig.baseApiPath}/v4/dash/roles/${id}?id=${id}`)
      .pipe(map(() => (void 0)));
  }

  public putRole(obj: IPPostRole, id: number): Observable<IPPostRoleResponse> {
    return this.http.put<IPPostRoleResponse>(`${this.apiConfig.baseApiPath}/v4/dash/roles/${id}`, obj);
  }
}
