import { Injectable } from '@angular/core';
import { AudiencesHttpsService } from '@cl-core/http-services/audiences-https.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudiencesService {
  constructor(private http: AudiencesHttpsService) {
  }

  public getUsers(): Observable<any> {
    return this.http.getUsers();
  }

  public getUser(id): Observable<any> {
    return this.http.getUser(id);
  }

  public getAudiences(): Observable<any> {
    return this.http.getAudiences();
  }

  public getVouchers(): Observable<any> {
    return this.http.getVouchers();
  }
}
