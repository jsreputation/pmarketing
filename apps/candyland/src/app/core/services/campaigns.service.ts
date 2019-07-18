import { Injectable } from '@angular/core';
import { CampaignsHttpsService } from '@cl-core/http-services/campaigns-https.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  constructor(private http: CampaignsHttpsService) {
  }

  public getCampaigns() {
    return this.http.getCampaigns();
  }

  public getCampaign(id: number) {
    this.http.getCampaign(id);
  }

  public updateCampaign(id: number, data: any) {
    this.http.updateCampaign(id, data);
  }

  public createCampaign(data: any) {
    this.http.createCampaign(data);
  }

  public deleteCampaign(id: number) {
      this.deleteCampaign(id);
  }

}
