import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { IJsonApiPostItem } from './jsonapi.payload';

@Injectable({
  providedIn: 'root'
})
export class StampHttpService {

  constructor(private http: HttpClient) {
  }

  public getStampsData(): Observable<{
    number: CommonSelect[],
    slotNumber: CommonSelect[],
    cardBackground: IGraphic[],
    rewardPost: IGraphic[],
    stampsPost: IGraphic[],
    rewardPreStamp: IGraphic[],
    preStamp: IGraphic[],
    backgroundStamp: IGraphic[],
  }> {
    return this.http.get<{
      number: CommonSelect[],
      slotNumber: CommonSelect[],
      cardBackground: IGraphic[],
      rewardPost: IGraphic[],
      stampsPost: IGraphic[],
      rewardPreStamp: IGraphic[],
      preStamp: IGraphic[],
      backgroundStamp: IGraphic[],
    }>('assets/actives/stamps/stamps-data.json');
  }

  public createStamp(data: IJsonApiPostItem<any>): Observable<IResponseApi<IEngagementApi>> {
    return this.http.post<IResponseApi<IEngagementApi>>(ApiConfig.stampsPath + '/', data);
  }

  public updateStamp(id: string, data: IResponseApi<any>): Observable<IResponseApi<IEngagementApi>> {
    return this.http.patch<IResponseApi<IEngagementApi>>(ApiConfig.engagementsPath + '/stamps/' + id, data);
  }

  public getStamp(id: string): Observable<IResponseApi<IEngagementApi>> {
    return this.http.get<IResponseApi<IEngagementApi>>(ApiConfig.engagementsPath + '/stamps/' + id);
  }

  public getStampsReport(id: string): Observable<StampsGraphicData> {
    return of({
      title: 'First Login Stamps Campaign Response',
      summaryInfo: [{
        title: 'Active Stamp Cards',
        value: id,
      }, {
        title: 'Engagement rate',
        value: '8%'
      }, {
        title: 'Average time to complete',
        value: '22.50'
      }],
      total: 2000,
      data: [
        {
          choices: {
            img_url: 'global/assets/stamps/pre-stamp-1.png',
            text: ''
          },
          amount: 350,
        },
        {
          choices: {
            img_url: 'global/assets/stamps/pre-stamp-1.png',
            text: ''
          },
          amount: 200,
        },
        {
          choices: {
            img_url: 'global/assets/stamps/pre-stamp-1.png',
            text: ''
          },
          amount: 150,
        },
        {
          choices: {
            img_url: 'global/assets/stamps/pre-stamp-1.png',
            text: ''
          },
          amount: 90,
        },
        {
          choices: {
            img_url: 'global/assets/stamps/pre-stamp-1.png',
            text: ''
          },
          amount: 20,
        },
        {
          choices: {
            img_url: 'global/assets/stamps/reward-pre-stamp-1.png',
            text: ''
          },
          amount: 1,
        },
      ]
    });
    // return this.http.get<StampsGraphicData>(ApiConfig.getReportPath + '/stamps/' + id);
  }
}
