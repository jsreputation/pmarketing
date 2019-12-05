import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWLoginAttributes, IWProfileAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  constructor(private http: HttpClient) {
  }

  public signIn(data: IJsonApiItem<ILogin>): Observable<HttpResponse<IJsonApiPayload<IWLoginAttributes>>> {
    return this.http.post<IJsonApiPayload<IWLoginAttributes>>(
      ApiConfig.signIn, { data }, { observe: 'response', params: { include: 'groups,credentials' } });
  }

  public getUser(id: string): Observable<IJsonApiPayload<IWProfileAttributes>> {
    return this.http.get<IJsonApiPayload<IWProfileAttributes>>(ApiConfig.IAMUsersPath + '/' + id);
  }

  public resetPassword(accountId: string, username: string): Observable<IJsonApiPayload<void>> {
    const req = {
      data: {
        attributes: {
          account_id: accountId,
          username
        }
      }
    };

    return this.http.post<IJsonApiPayload<void>>(`${ApiConfig.IAMUsersPath}/password`, req);
  }
}
