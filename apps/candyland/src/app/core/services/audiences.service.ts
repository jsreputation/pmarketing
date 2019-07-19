import { Injectable } from '@angular/core';
import { AudiencesHttpsService } from '@cl-core/http-services/audiences-https.service';

@Injectable({
  providedIn: 'root'
})
export class AudiencesService {
  constructor(private http: AudiencesHttpsService) {
  }

  public getUsers() {
    return this.http.getUsers();
  }

  public getAudiences() {
    return this.http.getAudiences();
  }
}
