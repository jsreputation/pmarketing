import { Observable, of } from 'rxjs';
import { ICampaign, ICampaignTableData } from '@cl-core/models/campaign/campaign';
import {
  IJsonApiItemPayload,
  IJsonApiListPayload,
  IWCampaignAttributes
} from '@perxtech/whistler';
import { ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { ITableData } from '@cl-core/models/data-list.interface';
import { CampaignsService } from '@cl-core-services';

export class MockCampaignService implements Partial<CampaignsService> {
  private getMockData(): ICampaignTableData {
    return {
      id: 'test',
      name: 'test',
      status: 'test',
      begin: new Date(),
      end: new Date(),
      audience: 'test',
      goal: 'test',
      engagementType: 'test',
    };
  }

  public getMockLoyaltyForm(): ILoyaltyForm {
    return {
      id: '1', name: 'test'
    };
  }

  public getTableData(): Observable<ITableData<ICampaignTableData>> {
    return of({
      data: [this.getMockData()],
      meta: {}
    });
  }

  public getCampaigns(): Observable<IJsonApiListPayload<IWCampaignAttributes>> {
    return of(null);
  }

  public getCampaign(): Observable<ICampaign> {
    return of(null);
  }
  public updateCampaign(): Observable<IJsonApiItemPayload<IWCampaignAttributes>> {
    return of(null);
  }

  public createCampaign(): Observable<IJsonApiItemPayload<IWCampaignAttributes>> {
    return of(null);
  }

  public duplicateCampaign(): Observable<IJsonApiItemPayload<IWCampaignAttributes>> {
    return of(null);
  }

  public deleteCampaign(): Observable<void> {
    return of(null);
  }

  public updateCampaignStatus(): Observable<ILoyaltyForm> {
    return of(this.getMockLoyaltyForm());
  }
}
