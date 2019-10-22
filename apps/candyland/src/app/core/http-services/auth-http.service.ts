import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  constructor(private http: HttpClient) {
  }

  public signIn(data: IJsonApiItem<ILogin>): Observable<HttpResponse<IJsonApiPayload<ILoginApi>>> {
    return this.http.post<IJsonApiPayload<ILoginApi>>(
      ApiConfig.signIn, {data}, {observe: 'response', params: {include: 'groups,credentials'}});
  }

  public getUser(id: string): Observable<any> {
    return this.http.get<any>(ApiConfig.IAMUsersPath + '/' + id);
  }
}
