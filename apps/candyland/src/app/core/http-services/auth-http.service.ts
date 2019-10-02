import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IJsonApiGenericPayload, IJsonApiPostData } from './jsonapi.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  constructor(private http: HttpClient) {
  }

  public signIn(body: IJsonApiPostData<any>): Observable<HttpResponse<IJsonApiGenericPayload<any>>> {
    return this.http.post<IJsonApiGenericPayload<any>>(ApiConfig.signIn, { data: body }, { observe: 'response' });
  }

  public getUser(id: string): Observable<any> {
    return this.http.get<any>(ApiConfig.IAMUsersPath + '/' + id);
  }
}
