import { Injectable } from '@angular/core';
import { CampaignsHttpAdapter } from '@cl-core/http-adapters/campaigns-http-adapter';
import { CampaignsHttpsService } from '@cl-core/http-services/campaigns-https.service';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ClHttpParams } from '@cl-helpers/http-params';
import { IWCampaignAttributes, IJsonApiListPayload, IJsonApiItemPayload, IJsonApiItem, IJsonApiPatchData } from '@perx/whistler';
import { ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { ICampaignTableData, ICampaign } from '@cl-core/models/campaign/campaign';
import { CampaignStatus } from '@cl-core/models/campaign/campaign-status.enum';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService implements ITableService {

  constructor(private campaignsHttpsService: CampaignsHttpsService) {
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<ICampaignTableData>> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.campaignsHttpsService.getCampaigns(httpParams).pipe(
      map((response: IJsonApiListPayload<IWCampaignAttributes>) => CampaignsHttpAdapter.transformTableData(response))
    );
  }

  public getCampaigns(params: HttpParamsOptions): Observable<IJsonApiListPayload<IWCampaignAttributes>> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.campaignsHttpsService.getCampaigns(httpParams);
  }

  public getCampaign(id: string): Observable<ICampaign> {
    return this.campaignsHttpsService.getCampaign(id).pipe(
      map((res: IJsonApiItemPayload<IWCampaignAttributes>) => res.data),
      map((res: IJsonApiItem<IWCampaignAttributes>) => CampaignsHttpAdapter.transformAPIResponseToCampaign(res))
    );
  }

  public updateCampaign(data: ICampaign): Observable<IJsonApiItemPayload<IWCampaignAttributes>> {
    const sendData: IJsonApiPatchData<IWCampaignAttributes> = {
      ...CampaignsHttpAdapter.transformFromCampaign(data),
      id: data.id
    };

    return this.campaignsHttpsService.updateCampaign(data.id, { data: sendData });
  }

  public createCampaign(data: ICampaign): Observable<IJsonApiItemPayload<IWCampaignAttributes>> {
    const sendData = CampaignsHttpAdapter.transformFromCampaign(data);
    return this.campaignsHttpsService.createCampaign({ data: sendData });
  }

  public duplicateCampaign(id: string): Observable<IJsonApiItemPayload<IWCampaignAttributes>> {
    return this.campaignsHttpsService.getCampaign(id)
      .pipe(
        map(response => {
          delete response.data.id;
          delete response.data.links;
          delete response.data.relationships;
          delete response.data.attributes.created_at;
          delete response.data.attributes.updated_at;
          delete response.data.attributes.urn;
          return response;
        }),
        switchMap((data: IJsonApiItemPayload<IWCampaignAttributes>) => this.campaignsHttpsService.createCampaign(data))
      );
  }

  public deleteCampaign(id: string): Observable<void> {
    return this.campaignsHttpsService.deleteCampaign(id);
  }

  public updateCampaignStatus(id: string, status: CampaignStatus): Observable<ILoyaltyForm> {
    const sendData: IJsonApiPatchData<IWCampaignAttributes> = CampaignsHttpAdapter.transformCampaignStatus(status, id);
    return this.campaignsHttpsService.updateCampaign(id, { data: sendData })
      .pipe(
        map(response => CampaignsHttpAdapter.transformToCampaign(response.data))
      );
  }
}
