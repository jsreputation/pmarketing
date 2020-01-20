import { Observable, of } from 'rxjs';
import { IJsonApiListPayload, IWAudiences } from '@perx/whistler';
import { IPoolUserLink } from '@cl-core-services';
import { IAudience } from '@cl-core/models/audiences/audiences';

export class MockAudienceService {
  public getAudiences(params: HttpParamsOptions): Observable<IJsonApiListPayload<IWAudiences>> {
    console.log(params);
    return of({
      data: [{
        id: '1',
        type: 'entity',
        attributes: {
          urn: 'test',
          created_at: 'test',
          updated_at: 'test',
          name: 'test',
          properties: 'test',
        }
      }]
    });
  }

  public getAudiencesList(
    params: HttpParamsOptions = {}
  ): Observable<IPoolUserLink[]> {
    console.log(params);
    return of([{
      name: 'test',
    checked: false,
    value: { id: 'test', type: 'test' }
    }]);
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<IAudience>> {
    console.log(params);
    return of({
      data: [{
        id: 5, updated_at: '5555', name: 'test', users_count: 5,
      }], meta: {}
    });
  }
}
