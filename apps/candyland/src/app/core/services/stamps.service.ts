import { Injectable } from '@angular/core';
import { StampHttpService } from '@perx/whistler-services';
import { Observable, of } from 'rxjs';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { map } from 'rxjs/operators';
import { IWStampEngagementAttributes, IJsonApiItemPayload } from '@perx/whistler';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StampsService {

  constructor(private stampHttpService: StampHttpService,
              private http: HttpClient) {
  }

  public getStampsData(): Observable<IStampsDefaultValue> {
    return this.http.get<IStampsDefaultValue>('assets/actives/stamps/stamps-data.json');
  }

  public getStamp(id: string): Observable<Partial<IStampsEntityForm>> {
    return this.stampHttpService.getStamp(id).pipe(
      map(response => EngagementHttpAdapter.transformStampForm(response.data))
    );
  }

  public createStamp(data: IStampsEntityForm): Observable<IJsonApiItemPayload<IWStampEngagementAttributes>> {
    const sentData = EngagementHttpAdapter.transformStamp(data);
    return this.stampHttpService.createStamp({ data: sentData });
  }

  public updateStamp(id: string, data: IStampsEntityForm): Observable<IJsonApiItemPayload<IWStampEngagementAttributes>> {
    const sendData = { ...EngagementHttpAdapter.transformStamp(data), id };
    return this.stampHttpService.updateStamp(id, { data: sendData });
  }

  public getStampsReport(id: string): Observable<StampsGraphicData> {
    return of({
      title: 'First Login Stamps Campaign Response',
      summaryInfo: [{
        title: 'Active Stamp Cards',
        value: id
      }, {
        title: 'Engagement rate',
        value: '8%'
      }, {
        title: 'Average time to complete',
        value: '22.50'
      }],
      total: 2000,
      payload: [
        {
          choices: {
            img_url: 'global/assets/stamps/pre-stamp-1.png',
            text: ''
          },
          amount: 350
        },
        {
          choices: {
            img_url: 'global/assets/stamps/pre-stamp-1.png',
            text: ''
          },
          amount: 200
        },
        {
          choices: {
            img_url: 'global/assets/stamps/pre-stamp-1.png',
            text: ''
          },
          amount: 150
        },
        {
          choices: {
            img_url: 'global/assets/stamps/pre-stamp-1.png',
            text: ''
          },
          amount: 90
        },
        {
          choices: {
            img_url: 'global/assets/stamps/pre-stamp-1.png',
            text: ''
          },
          amount: 20
        },
        {
          choices: {
            img_url: 'global/assets/stamps/reward-pre-stamp-1.png',
            text: ''
          },
          amount: 1
        }
      ]
    });
  }
}
