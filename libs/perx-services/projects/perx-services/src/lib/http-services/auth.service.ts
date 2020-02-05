import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../configs/api-config';
import { IPLoginRequest, IPLoginResonse, IPAuthorizations } from '@perx/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { }

  public postLogin(req: IPLoginRequest): Observable<IPLoginResonse> {
    return this.http.post<IPLoginResonse>(`${this.apiConfig.baseApiPath}/v4/dash/user_sessions`, req);
  }

  public getAuthorizations(): Observable<IPAuthorizations> {
    return this.http.get<IPAuthorizations>(`${this.apiConfig.baseApiPath}/v4/dash/authorizations`);
  }
}
