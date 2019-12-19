import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWLoginAttributes, IWProfileAttributes, IJsonApiItemPayload, IJsonApiPostData } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  constructor(private http: HttpClient) {
  }

  public signIn(data: IJsonApiPostData<ILogin>): Observable<HttpResponse<IJsonApiItemPayload<IWLoginAttributes>>> {
    return this.http.post<IJsonApiItemPayload<IWLoginAttributes>>(
      ApiConfig.signIn, { data }, { observe: 'response', params: { include: 'groups,credentials' } });
  }

  public getUser(id: string): Observable<IJsonApiItemPayload<IWProfileAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWProfileAttributes>>(ApiConfig.IAMUsersPath + '/' + id);
  }

  public resetPassword(accountId: string, username: string): Observable<IJsonApiItemPayload<void>> {
    const req = {
      data: {
        attributes: {
          account_id: accountId,
          username
        }
      }
    };

    return this.http.post<IJsonApiItemPayload<void>>(`${ApiConfig.IAMUsersPath}/password`, req);
  }

  public changePassword(password: string, token: string): Observable<any> {
    const req = {
      data: {
        attributes: {
          token,
          password,
          password_confirmation: password
        }
      }
    };
    return this.http.put<IJsonApiItemPayload<void>>(`${ApiConfig.IAMUsersPath}/password`, req);
  }
}
