import { Injectable } from '@angular/core';
import { CampaignsHttpAdapter } from '@cl-core/http-adapters/campaigns-http-adapter';
import { CampaignsHttpsService } from '@cl-core/http-services/campaigns-https.service';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ClHttpParams } from '@cl-helpers/http-params';
import { ICampaignTableData, ICampaignAttributes, ICampaign } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService implements ITableService {

  constructor(private campaignsHttpsService: CampaignsHttpsService) {
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<ICampaignTableData>> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.campaignsHttpsService.getCampaigns(httpParams).pipe(
      map((response: IJsonApiListPayload<ICampaignAttributes>) => CampaignsHttpAdapter.transformTableData(response))
    );
  }

  public getCampaigns(params: HttpParamsOptions): Observable<any> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.campaignsHttpsService.getCampaigns(httpParams);
  }

  public getCampaign(id: string): Observable<ICampaign> {
    return this.campaignsHttpsService.getCampaign(id).pipe(
      map((res: IJsonApiPayload<ICampaignAttributes>) => res.data),
      map((res: IJsonApiItem<ICampaignAttributes>) => CampaignsHttpAdapter.transformAPIResponseToCampaign(res))
    );
  }

  public updateCampaign(id: string, data: any): Observable<IJsonApiPayload<ICampaignAttributes>> {
    const sendData = CampaignsHttpAdapter.transformFromCampaign(data);
    sendData.id = id;
    return this.campaignsHttpsService.updateCampaign(id, {data: sendData});
  }

  public createCampaign(data: any): Observable<IJsonApiPayload<ICampaignAttributes>> {
    const sendData = CampaignsHttpAdapter.transformFromCampaign(data);
    return this.campaignsHttpsService.createCampaign({data: sendData});
  }

  public duplicateCampaign(id: string): Observable<IJsonApiPayload<ICampaignAttributes>> {
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
        switchMap((data: IJsonApiPayload<ICampaignAttributes>) => this.campaignsHttpsService.createCampaign(data))
      );
  }

  public deleteCampaign(id: string): Observable<any> {
    return this.campaignsHttpsService.deleteCampaign(id);
  }

}
