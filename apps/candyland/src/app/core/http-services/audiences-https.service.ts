import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';

@Injectable({
  providedIn: 'root'
})
export class AudiencesHttpsService {
  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<any> {
    return this.http.get('assets/mocks/users.json');
  }

  public getUser(id: number): Observable<any> {
    return this.http.get(ApiConfig.getAllUsers + '/' + id);
  }

  public getAudiences(): Observable<any> {
    return this.http.get('assets/mocks/audiences.json');
  }

  public getVouchers(): Observable<any> {
    return this.http.get('assets/mocks/vouchers.json');
  }

  public getAllUsers(params: HttpParams): Observable<any> {
    return this.http.get(ApiConfig.getAllUsers, {params});
  }

  public createUser(body): Observable<any> {
    return this.http.post(ApiConfig.getAllUsers, {data: body});
  }
}
