import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';

@Injectable({
  providedIn: 'root'
})
export class StampHttpService {

  constructor(private http: HttpClient) { }

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

  public createStamp(data: any): Observable<any> {
    return this.http.post(ApiConfig.stampsPath + '/', data);
  }

}
