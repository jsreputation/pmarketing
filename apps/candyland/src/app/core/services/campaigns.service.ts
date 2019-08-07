import { Injectable } from '@angular/core';
import { CampaignsHttpsService } from '@cl-core/http-services/campaigns-https.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  constructor(private http: CampaignsHttpsService) {
  }

  public getCampaigns(): Observable<any> {
    return this.http.getCampaigns();
  }

  public getCampaign(id: number): void {
    this.http.getCampaign(id);
  }

  public updateCampaign(id: number, data: any): void {
    this.http.updateCampaign(id, data);
  }

  public createCampaign(data: any): void {
    this.http.createCampaign(data);
  }

  public deleteCampaign(id: number): void {
      this.deleteCampaign(id);
  }

}
