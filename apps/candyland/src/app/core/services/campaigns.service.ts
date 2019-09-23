import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampaignsHttpAdapter } from '@cl-core/http-adapters/campaigns-http-adapter';
import { CampaignsHttpsService } from '@cl-core/http-services/campaigns-https.service';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService implements ITableService {

  constructor(private campaignsHttpsService: CampaignsHttpsService) {
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<ICampaign>> {
    return this.campaignsHttpsService.getCampaigns(new HttpParams(params)).pipe(
      map(response => CampaignsHttpAdapter.transformTableData(response))
    );
  }

  public getCampaigns(params: HttpParamsOptions): Observable<any> {
    return this.campaignsHttpsService.getCampaigns(new HttpParams(params));
  }

  public getCampaign(id: string): void {
    this.campaignsHttpsService.getCampaign(id);
  }

  public updateCampaign(id: number, data: any): void {
    this.campaignsHttpsService.updateCampaign(id, data);
  }

  public createCampaign(data: any): Observable<any> {
    const sendData = CampaignsHttpAdapter.transformFromCampaign(data);
    return this.campaignsHttpsService.createCampaign({data: sendData});
  }

  public duplicateCampaign(id: string): Observable<any> {
    return this.campaignsHttpsService.getCampaign(id)
      .pipe(
        map(response => {
          delete response.data.id;
          delete response.data.links;
          delete response.data.attributes.goal;
          delete response.data.attributes.status;
          delete response.data.attributes.created_at;
          delete response.data.attributes.updated_at;
          delete response.data.attributes.urn;
          return response;
        }),
        switchMap(data => this.campaignsHttpsService.createCampaign(data))
      );
  }

  public deleteCampaign(id: string): Observable<any> {
    return this.campaignsHttpsService.deleteCampaign(id);
  }

}
