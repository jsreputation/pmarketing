import { Observable, of } from 'rxjs';
import { ICustomTireForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { HttpParamsOptions } from '@cl-core/models/params-map';
import { ITableData } from '@cl-core/models/data-list.interface';

export class MockLoyaltyCustomTierService {

  public getMockData(): ICustomTireForm {
    return {
      id: '1',
      type: 'type',
      name: 'test',
      joinMethod: {
        transactionAmount: true,
        signUp: true,
        inviteOnly: true,
        amount: 5,
        pointsThreshold: true,
        points: 5,
      },
      imageUrl: 'test',
      earnBonus: 5,
      burnDiscount: 2,
      pointsExpiry: {
        amount: 5,
        type: 'test',
        trigger: 'test',
      }
    };
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<ICustomTireForm>> {
    console.log(params);
    return of({
      data: [this.getMockData()],
      meta: {}
    });
  }

  public getCustomTier(id: string, params: HttpParamsOptions): Observable<ICustomTireForm> {
    console.log(id, params);
    return of(this.getMockData());
  }

  public createCustomTier(data: any, basicTierId: string): Observable<ICustomTireForm> {
    console.log(data, basicTierId);
    return of(this.getMockData());
  }

  public updateCustomTier(customTierId: string, data: any, basicTierId: string): Observable<ICustomTireForm> {
    console.log(data, basicTierId, customTierId);
    return of(this.getMockData());
  }

  public deleteCustomTier(id: string): Observable<void> {
    console.log(id);
    return of(null);
  }
}
