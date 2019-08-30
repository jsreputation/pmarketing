import { Injectable } from '@angular/core';
import { AudiencesHttpsService } from '@cl-core/http-services/audiences-https.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { HttpParams } from '@angular/common/http';
import { User } from '@cl-core/models/audiences/user.model';

@Injectable({
  providedIn: 'root'
})
export class AudiencesService implements ITableService {
  constructor(private http: AudiencesHttpsService) {
  }

  public getUsers(): Observable<any> {
    return this.http.getUsers();
  }

  public getUser(id): Observable<any> {
    return this.http.getUser(id).pipe(
      map((res: any) => new User(res.data))
    );
  }

  public getAudiences(): Observable<any> {
    return this.http.getAudiences();
  }

  public getVouchers(): Observable<any> {
    return this.http.getVouchers();
  }

  public getAllUsers(data: HttpParams): any {
    return this.http.getAllUsers(data);
  }

  public getTableData(params: HttpParams): Observable<User> {
    return this.http.getAllUsers(params)
      .pipe(
        map((res: any) => res.data.map(item => new User(item)))
      );
  }

  public createUser(data: any): Observable<any> {
    return this.http.createUser(data);
  }
}
