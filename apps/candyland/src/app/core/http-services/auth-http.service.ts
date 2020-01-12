import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWLoginAttributes, IWProfileAttributes, IJsonApiItemPayload, IJsonApiPostData } from '@perx/whistler';
import { IAMUser } from '@cl-core/models/settings/IAMUser.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  constructor(private http: HttpClient) {
  }

  public signIn(data: Partial<IJsonApiPostData<ILogin>>): Observable<HttpResponse<IJsonApiItemPayload<IWLoginAttributes>>> {
    return this.http.post<IJsonApiItemPayload<IWLoginAttributes>>(
      ApiConfig.signIn,
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

    return this.http.post<IJsonApiItemPayload<void>>(`${ApiConfig.IAMUsersPath}/password`, req);
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
    return this.http.put<HttpResponse<IJsonApiItemPayload<void>>>(`${ApiConfig.IAMUsersPath}/password`, req, { observe: 'response'});
  }

  public patchUser(user: IAMUser, id: string): Observable<IJsonApiItemPayload<IWProfileAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWProfileAttributes>>(`${ApiConfig.IAMUsersPath}/${id}`, user);
  }
}
