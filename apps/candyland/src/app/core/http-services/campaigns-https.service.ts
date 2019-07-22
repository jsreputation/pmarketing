import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampaignsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getCampaigns() {
    return this.http.get('assets/mocks/campaigns.json').pipe(
    );
  }

  public getCampaign(id: number) {
    console.log('getCampaign', id);
  }

  public updateCampaign(id: number, data: any) {
    console.log('updateCampaign', id, data);
  }

  public createCampaign(data: any) {
    console.log('createCampaign', data);
  }

  public deleteCampaign(id: number) {
    console.log('deleteCampaign', id);
  }
}
