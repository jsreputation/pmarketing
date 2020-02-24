import { Observable, of } from 'rxjs';
import {
  IJsonApiItemPayload, IWMerchantAttributes, IWMerchantBranchAttributes
} from '@perx/whistler';
import { IMerchantForm } from '@cl-core/models/merchant/merchant-form-interface';
import { ITableData } from '@cl-core/models/data-list.interface';
import { MerchantsService } from '@cl-core-services';

export class MockMerchantsService implements Partial<MerchantsService> {

  public getMockMerchantForm(id?: string): IMerchantForm {
    return {
      name: 'string;',
      type: 'string;',
      id: id ? id : '1',
      description: 'string;',
      image: 'string;',
      countryCode: 'string;',
      phone: 'string;',
      address: 'string;',
      city: 'string;',
      state: 'string;',
      postalCode: 'string;',
      weblink: 'string;',
      branches: [],
      deletedBranches: [],
      createdAt: 'string;',
    };
  }
  public getTableData(): Observable<ITableData<IMerchantForm>> {

    return of({
      data: [this.getMockMerchantForm()],
      meta: {}
    });
  }

  public getMerchant(id: string): Observable<IMerchantForm | null> {
    return of(this.getMockMerchantForm(id));
  }

  public createMerchant(data: IMerchantForm): Observable<number> {
    return of((data.id as any));
  }

  public createMerchantBranch(): Observable<IJsonApiItemPayload<IWMerchantBranchAttributes>> {
    return of(null);
  }

  public updateMerchantBranch(): Observable<IJsonApiItemPayload<IWMerchantBranchAttributes>> {
    return of(null);
  }

  public deleteMerchantBranch(): Observable<void> {
    return of(null);
  }

  public updateMerchant(): Observable<IJsonApiItemPayload<IWMerchantAttributes>> {
    return of(null);
  }

  public deleteMerchant(id: string): Observable<any> {
    return of(id);
  }

  public duplicateMerchant(merchant: IMerchantForm): Observable<number> {
    return of(merchant.id as any);
  }

}
