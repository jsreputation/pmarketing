import { Observable, of } from 'rxjs';
import { ICampaign, ICampaignTableData } from '@cl-core/models/campaign/campaign';
import {
  IJsonApiItemPayload,
  IJsonApiListPayload,
  IWCampaignAttributes
} from '@perx/whistler';
import { CampaignStatus } from '@cl-core/models/campaign/campaign.enum';
import { ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';

export class MockCampaignService {

  public getMockData(): ICampaignTableData {
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

  public getTableData(params: HttpParamsOptions): Observable<ITableData<ICampaignTableData>> {
    console.log(params);
    return of({
      data: [this.getMockData()],
      meta: {}
    });
  }

  public getCampaigns(params: HttpParamsOptions): Observable<IJsonApiListPayload<IWCampaignAttributes>> {
    console.log(params);
    return of(null);
  }

  public getCampaign(id: string): Observable<ICampaign> {
    console.log(id);
    return of(null);
  }
  public updateCampaign(data: ICampaign): Observable<IJsonApiItemPayload<IWCampaignAttributes>> {
    console.log(data);
    return of(null);
  }

  public createCampaign(data: ICampaign): Observable<IJsonApiItemPayload<IWCampaignAttributes>> {
    console.log(data);
    return of(null);
  }

  public duplicateCampaign(id: string): Observable<IJsonApiItemPayload<IWCampaignAttributes>> {
    console.log(id);
    return of(null);
  }

  public deleteCampaign(id: string): Observable<void> {
    console.log(id);
    return of(null);
  }

  public updateCampaignStatus(id: string, status: CampaignStatus): Observable<ILoyaltyForm> {
    console.log(id, status);
    return of(this.getMockLoyaltyForm());
  }
}
