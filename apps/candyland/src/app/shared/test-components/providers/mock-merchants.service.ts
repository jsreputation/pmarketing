import { Observable, of } from 'rxjs';
import {
  IJsonApiItemPayload, IWMerchantAttributes, IWMerchantBranchAttributes
} from '@perx/whistler';
import { IMerchantForm } from '@cl-core/models/merchant/merchant-form-interface';
import { HttpParamsOptions } from '@cl-core/models/params-map';
import { ITableData } from '@cl-core/models/data-list.interface';
import { IBranch } from '@cl-core/models/merchant/branch-interface';

export class MockMerchantsService {

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
  public getTableData(params: HttpParamsOptions | any): Observable<ITableData<IMerchantForm>> {
    console.log(params);
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

  public createMerchantBranch(merchantId: string, data: IBranch): Observable<IJsonApiItemPayload<IWMerchantBranchAttributes>> {
    console.log(merchantId, data);
    return of(null);
  }

  public updateMerchantBranch(merchantId: string, data: IBranch): Observable<IJsonApiItemPayload<IWMerchantBranchAttributes>> {
    console.log(merchantId, data);
    return of(null);
  }

  public deleteMerchantBranch(id: string): Observable<void> {
    console.log(id);
    return of(null);
  }

  public updateMerchant(
    id: string,
    data: IMerchantForm
  ): Observable<IJsonApiItemPayload<IWMerchantAttributes>> {
    console.log(id, data);
    return of(null);
  }

  public deleteMerchant(id: string): Observable<any> {
    return of(id);
  }

  public duplicateMerchant(merchant: IMerchantForm): Observable<number> {
    console.log(merchant);
    return of(merchant.id as any);
  }

}
