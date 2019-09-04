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
export class AudiencesService implements ITableService {
  constructor(private http: AudiencesHttpsService) {
  }

  public getAudiences(data: HttpParams): Observable<any> {
    return this.http.getAudiences(data);
  }

  public getVouchers(): Observable<any> {
    return this.http.getVouchers();
  }

  public getTableData(params: HttpParams): Observable<ITableData<IAudiences>> {
    return this.http.getAudiences(params)
      .pipe(
        map((res: any) => AudiencesHttpAdapter.transformAudiencesTableData(res))
      );
  }
}
