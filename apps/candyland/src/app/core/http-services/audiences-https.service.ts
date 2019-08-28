import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigPathService } from '@cl-core-services';

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
    return this.http.get(ConfigPathService.getAllUsers + '/' + id);
  }

  public getAudiences(): Observable<any> {
    return this.http.get('assets/mocks/audiences.json');
  }

  public getVouchers(): Observable<any> {
    return this.http.get('assets/mocks/vouchers.json');
  }

  public getAllUsers(params: any): Observable<any> {
    return this.http.get(ConfigPathService.getAllUsers, params);
  }

  public createUser(body): Observable<any> {
    return this.http.post(ConfigPathService.getAllUsers, {data: body});
  }
}
