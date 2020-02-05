import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWLoginAttributes, IWProfileAttributes, IJsonApiItemPayload, IJsonApiPostData } from '@perx/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class AuthHttpService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigServices
  ) { }

  public signIn(data: Partial<IJsonApiPostData<IWProfileAttributes>>): Observable<HttpResponse<IJsonApiItemPayload<IWLoginAttributes>>> {
    return this.http.post<IJsonApiItemPayload<IWLoginAttributes>>(
      this.apiConfig.signIn,
      { data },
      { observe: 'response', params: { include: 'groups,credentials' } }
    );
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

    return this.http.post<IJsonApiItemPayload<void>>(`${this.apiConfig.IAMUsersPath}/password`, req);
  }

  public changePassword(password: string, token: string): Observable<HttpResponse<any>> {
    const req = {
      data: {
        attributes: {
          token,
          password,
          password_confirmation: password
        }
      }
    };
    return this.http.put<HttpResponse<IJsonApiItemPayload<void>>>(`${this.apiConfig.IAMUsersPath}/password`, req, { observe: 'response' });
  }

  public patchUser(user: IWProfileAttributes, id: string): Observable<IJsonApiItemPayload<IWProfileAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWProfileAttributes>>(`${this.apiConfig.IAMUsersPath}/${id}`, user);
  }
}
