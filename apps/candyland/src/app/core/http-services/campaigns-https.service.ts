import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
  constructor(private http: HttpClient) {
  }

  public getCampaigns() {
    return this.http.get('/assets/mocks/campaigns.json').pipe(
    );
  }
}
