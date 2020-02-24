import { Observable, of } from 'rxjs';
import { ICustomTireForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { ITableData } from '@cl-core/models/data-list.interface';
import { LoyaltyCustomTierService } from '@cl-core/services/loyalty-custom-tier.service';

export class MockLoyaltyCustomTierService implements Partial<LoyaltyCustomTierService> {

  private getMockData(): ICustomTireForm {
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

  public getTableData(): Observable<ITableData<ICustomTireForm>> {
    return of({
      data: [this.getMockData()],
      meta: {}
    });
  }

  public getCustomTier(): Observable<ICustomTireForm> {
    return of(this.getMockData());
  }

  public createCustomTier(): Observable<ICustomTireForm> {
    return of(this.getMockData());
  }

  public updateCustomTier(): Observable<ICustomTireForm> {
    return of(this.getMockData());
  }

  public deleteCustomTier(): Observable<void> {
    return of(null);
  }
}
