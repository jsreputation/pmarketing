import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiConfig } from '@es-core/api-config';

import { Observable } from 'rxjs';
import {
  IWProfileAttributes,
  IJsonApiItemPayload,
  IJsonApiPostData,
  IWIAMUserAttributes
} from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  constructor(private http: HttpClient) {
  }

  public signIn(data: Partial<IJsonApiPostData<ILogin>>): Observable<HttpResponse<IJsonApiItemPayload<IWIAMUserAttributes>>> {
    return this.http.post<IJsonApiItemPayload<IWIAMUserAttributes>>(
      ApiConfig.signIn,
      {data},
      {observe: 'response', params: {include: 'groups,credentials'}}
    );
  }

  public getUser(id: string): Observable<IJsonApiItemPayload<IWProfileAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWProfileAttributes>>(ApiConfig.IAMUsersPath + '/' + id);
  }

  public resetPassword(username: string): Observable<IJsonApiItemPayload<void>> {
    const req = {
      data: {
        attributes: {
          account_id: 'retail',
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
    return this.http.put<HttpResponse<IJsonApiItemPayload<void>>>(`${ApiConfig.IAMUsersPath}/password`, req, {observe: 'response'});
  }
}
