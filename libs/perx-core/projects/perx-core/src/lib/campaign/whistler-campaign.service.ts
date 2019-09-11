import { Injectable } from '@angular/core';
import { ICampaignService } from './icampaign.service';
import { Observable } from 'rxjs';
import { ICampaign } from 'perx-core/perx-core';

@Injectable({
  providedIn: 'root'
})
export class WhistlerCampaignService extends ICampaignService {
  public getCampaigns(): Observable<ICampaign[]> {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public getCampaign(id: number): Observable<ICampaign> {
    throw new Error('Method not implemented.');
  }
}
