import { Observable, of } from 'rxjs';
import {
  IJsonApiItem,
  IJsonApiListPayload,
  IWAssignedAttributes
} from '@perx/whistler';
import { ITableData } from '@cl-core/models/data-list.interface';
import { IAudienceVoucher } from '@cl-core/models/vouchers/audience-voucher.interface';
import { AudiencesVouchersService } from '@cl-core-services';

export class MockAudiensesVouchersService implements Partial<AudiencesVouchersService> {

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

  public getTableData(): Observable<ITableData<IAudienceVoucher>> {
    return of({
      data: [this.getMockAudienceVoucher()],
      meta: {}
    });
  }

  public voucherAssigned(): Observable<IJsonApiListPayload<IWAssignedAttributes>> {
    return of(null);
  }

  public updateVoucherExpiry(): Observable<IJsonApiItem<IWAssignedAttributes>> {
    return of(null);
  }
}
