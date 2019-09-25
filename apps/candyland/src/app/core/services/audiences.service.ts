import { Injectable } from '@angular/core';
import { AudiencesHttpAdapter } from '@cl-core/http-adapters/audiences-http-adapter';
import { AudiencesHttpsService } from '@cl-core/http-services/audiences-https.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { ClHttpParams } from '@cl-helpers/http-params';

@Injectable({
  providedIn: 'root'
})
export class AudiencesService implements ITableService {
  constructor(private http: AudiencesHttpsService) {
  }

  public getAudiences(params: HttpParamsOptions): Observable<any> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.http.getAudiences(httpParams);
  }

  public getAudiencesList(params: HttpParamsOptions): Observable<any> {
    params.include = 'users';
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.http.getAudiencesList(httpParams)
      .pipe(
        map((res: any) => {
        const poolsList = res.data;
        return poolsList.map((pool: any) => {
          return {name: pool.attributes.name, checked: false, value: {id: pool.id, type: pool.type}};
        });
    }));
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<IAudiences>> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.http.getAudiences(httpParams)
      .pipe(
        map((res: any) => AudiencesHttpAdapter.transformAudiencesTableData(res))
      );
  }
}
