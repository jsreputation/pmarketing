import { Injectable } from '@angular/core';
import { AudiencesHttpAdapter } from '@cl-core/http-adapters/audiences-http-adapter';
import { AudiencesHttpsService } from '@cl-core/http-services/audiences-https.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AudiencesUserService implements ITableService {
  constructor(private http: AudiencesHttpsService) {
  }

  public getUser(id: number): Observable<any> {
    return this.http.getUser(id).pipe(
      map((res: any) => AudiencesHttpAdapter.transformUserWithPools(res))
    );
  }

  public getAllUsers(data: HttpParams): any {
    return this.http.getAllUsers(data);
  }

  public getTableData(params: HttpParams): Observable<ITableData<IUser>> {
    return this.http.getAllUsers(params)
      .pipe(
        map((res: any) => AudiencesHttpAdapter.transformUsersWithPools(res))
      );
  }

  public createUser(user: any): Observable<any> {
    const formattedUser = AudiencesHttpAdapter.transformCreateUser(user);
    return this.http.createUser(formattedUser);
  }

  public updateUserPools(user: any): Observable<any> {
    const formattedData = AudiencesHttpAdapter.transformUpdateUserPools(user);
    return this.http.updateUserPools(formattedData);
  }
}
