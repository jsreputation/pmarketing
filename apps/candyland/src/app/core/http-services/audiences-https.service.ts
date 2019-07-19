import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AudiencesHttpsService {
  constructor(private http: HttpClient) {
  }

  public getUsers() {
    return this.http.get('assets/mocks/users.json');
  }

  public getAudiences() {
    return this.http.get('assets/mocks/audiences.json');
  }
}
