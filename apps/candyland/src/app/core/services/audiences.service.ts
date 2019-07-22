import { Injectable } from '@angular/core';
import { AudiencesHttpsService } from '@cl-core/http-services/audiences-https.service';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AudiencesService {
  constructor(private http: AudiencesHttpsService) {
  }

  public getUsers() {
    return this.http.getUsers();
  }

  public getUser(id) {
    return this.http.getUser(id)
      .pipe(
        map(users => {
          return users.find(user => user.id === id);
        })
      );
  }

  public getAudiences() {
    return this.http.getAudiences();
  }

  public getVouchers(id: number) {
    return this.http.getVouchers(id);
  }
}
