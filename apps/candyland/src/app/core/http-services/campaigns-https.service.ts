import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
  constructor(private http: HttpClient) {
  }

  public getСampaigns() {
    return this.http.get('/assets/mocks/campaigns.json').pipe(
    );
  }
}
