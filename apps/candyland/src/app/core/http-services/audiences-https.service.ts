import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AudiencesHttpsService {
  constructor(private http: HttpClient) {
  }

  public getUsers() {
    return this.http.get('assets/mocks/users.json');
  }

  public getUser(id: number) {
    return this.http.get('assets/mocks/users.json')
      .pipe(
        map((users: any[]) => {
          return users.find(user => user.id === +id);
        })
      );
  }

  public getAudiences() {
    return this.http.get('assets/mocks/audiences.json');
  }

  public getVouchers() {
    return this.http.get('assets/mocks/vouchers.json');
  }
}
