import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getCampaigns(): Observable<any> {
    return this.http.get('assets/mocks/campaigns.json').pipe(
    );
  }

  public getCampaign(id: number): void {
    console.log('getCampaign', id);
  }

  public updateCampaign(id: number, data: any): void {
    console.log('updateCampaign', id, data);
  }

  public createCampaign(data: any): void {
    console.log('createCampaign', data);
  }

  public deleteCampaign(id: number): void {
    console.log('deleteCampaign', id);
  }
}
