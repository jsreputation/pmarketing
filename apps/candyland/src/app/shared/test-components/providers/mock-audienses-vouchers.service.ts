import { Observable, of } from 'rxjs';
import {
  IJsonApiItem,
  IJsonApiListPayload,
  IWAssignedAttributes
} from '@perx/whistler';

export class MockAudiensesVouchersService {

  public getMockAudienceVoucher(): IAudienceVoucher {
    return {
      id: '1;',
    batchId: 'string;',
    endDate: 'string;',
    rewardId: 'string;',
    issuedDate: new Date(),
    expiryDate: new Date(),
    status: 'string;',
    reward: null,
    };
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<IAudienceVoucher>> {
    console.log(params);
    return of({
      data: [this.getMockAudienceVoucher()],
      meta: {}
    });
  }

  public voucherAssigned(source: string, assigned: string): Observable<IJsonApiListPayload<IWAssignedAttributes>> {
    console.log(source, assigned);
    return of(null);
  }

  public updateVoucherExpiry(id: string, endData: string): Observable<IJsonApiItem<IWAssignedAttributes>> {
    console.log(id, endData);
    return of(null);
  }
}