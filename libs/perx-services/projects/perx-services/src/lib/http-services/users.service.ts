import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../configs/api-config';
import { Observable } from 'rxjs';
import { IPUsers, IPUser } from '@perxtech/model';
import { IPPostUser } from '@perxtech/model/dist/perx-model/lib/users/users';

export interface IUsersQuery {
  page?: number;
  size?: number;
  search_string?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { }

  public getUsers(query?: IUsersQuery): Observable<IPUsers> {
    const params: { [k: string]: string } = {};
    if (query) {
      Object.entries(query).forEach(([k, v]: [string, string | number]) => params[k] = `${v}`);
    }
    return this.http.get<IPUsers>(`${this.apiConfig.baseApiPath}/v4/dash/users`, { params });
  }

  public postUser(req: IPPostUser): Observable<IPUser> {
    return this.http.post<IPUser>(`${this.apiConfig.baseApiPath}/v4/dash/users/`, req);
  }

  public putUser(req: IPPostUser, userId: number): Observable<IPUser> {
    return this.http.put<IPUser>(`${this.apiConfig.baseApiPath}/v4/dash/users/${userId}`, req);
  }

  public patchDeactivateUser(id: number): Observable<IPUser> {
    return this.http.put<IPUser>(`${this.apiConfig.baseApiPath}/v4/dash/users/${id}/deactivate`, { id });
  }

  public patchActivateUser(id: number): Observable<IPUser> {
    return this.http.put<IPUser>(`${this.apiConfig.baseApiPath}/v4/dash/users/${id}/activate`, { id });
  }
}
