import { Observable, of } from 'rxjs';
import { IJsonApiListPayload, IWAudiences } from '@perxtech/whistler';
import { IPoolUserLink, AudiencesService } from '@cl-core-services';
import { IAudience } from '@cl-core/models/audiences/audiences';
import { ITableData } from '@cl-core/models/data-list.interface';

export class MockAudienceService implements Partial<AudiencesService> {
  public getAudiences(): Observable<IJsonApiListPayload<IWAudiences>> {
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

  public getAudiencesList(): Observable<IPoolUserLink[]> {
    return of([{
      name: 'test',
      checked: false,
      value: { id: 'test', type: 'test' }
    }]);
  }

  public getTableData(): Observable<ITableData<IAudience>> {
    return of({
      data: [{
        id: 5, updated_at: '5555', name: 'test', users_count: 5,
      }], meta: {
        page_count: 1,
        record_count: 1
      }
    });
  }
}
