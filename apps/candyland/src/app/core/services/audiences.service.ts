import { Injectable } from '@angular/core';
import { AudiencesHttpAdapter } from '@cl-core/http-adapters/audiences-http-adapter';
import { AudiencesHttpsService } from '@perx/whistler-services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { ClHttpParams } from '@cl-helpers/http-params';
import { IWAudiences, IJsonApiItem, IJsonApiListPayload } from '@perx/whistler';
import { IAudience } from '@cl-core/models/audiences/audiences';

export interface IPoolUserLink {
  name: string;
  checked: boolean;
  value: { id: string; type: string; };
}

@Injectable({
  providedIn: 'root'
})
export class AudiencesService implements ITableService<IAudience> {

  constructor(private http: AudiencesHttpsService) {
  }

  public getAudiences(params: HttpParamsOptions): Observable<IJsonApiListPayload<IWAudiences>> {
    const httpParams = ClHttpParams.createHttpParams(params);
    httpParams.set('filter[system_generated]', 'false');
    return this.http.getAudiences(httpParams);
  }

  public getAudiencesList(
    params: HttpParamsOptions = {}
  ): Observable<IPoolUserLink[]> {
    const defaultParams: HttpParamsOptions = {
      'page[number]': '1',
      'page[size]': '20',
      'filter[system_generated]': 'false',
    };
    const httpParams = ClHttpParams.createHttpParams({ ...defaultParams, ...params });
    return this.http.getAudiences(httpParams)
      .pipe(
        map((res: IJsonApiListPayload<IWAudiences>) => {
          const poolsList = res.data;
          return poolsList
            .filter((pool: IJsonApiItem<IWAudiences>) => !pool.attributes.system_generated)
            .map((pool: IJsonApiItem<IWAudiences>) => ({
              name: pool.attributes.name,
              checked: false,
              value: { id: pool.id, type: pool.type }
            }));
        }));
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<IAudience>> {
    const httpParams = ClHttpParams.createHttpParams(params);
    httpParams.set('filter[system_generated]', 'false');
    return this.http.getAudiences(httpParams)
      .pipe(
        map((res: IJsonApiListPayload<IWAudiences>) => AudiencesHttpAdapter.transformAudiencesTableData(res))
      );
  }
}
