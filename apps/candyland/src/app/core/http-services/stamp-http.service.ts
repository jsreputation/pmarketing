import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StampHttpService {

  constructor(private http: HttpClient) { }

  public getBackground(): Observable<IGraphic[]> {
    return this.http.get('assets/actives/stamps/background-stamps.json')
      .pipe(
        map(res => (res as IGraphic[]))
      );
  }

  public getPreStamps(): Observable<IGraphic[]> {
    return this.http.get('assets/actives/stamps/pre-stamps.json')
      .pipe(
        map(res => (res as IGraphic[]))
      );
  }

  public getRewardPreStamps(): Observable<IGraphic[]> {
    return this.http.get('assets/actives/stamps/reward-pre-stamps.json')
      .pipe(
        map(res => (res as IGraphic[]))
      );
  }

  public getPostStamps(): Observable<IGraphic[]> {
    return this.http.get('assets/actives/stamps/post-stamps.json')
      .pipe(
        map(res => (res as IGraphic[]))
      );
  }

  public getRewardPostStamps(): Observable<IGraphic[]> {
    return this.http.get('assets/actives/stamps/reward-post-stamps.json')
      .pipe(
        map(res => (res as IGraphic[]))
      );
  }

  public getCardBackground(): Observable<IGraphic[]> {
    return this.http.get('assets/actives/stamps/card-background.json')
      .pipe(
        map(res => (res as IGraphic[]))
      );
  }

  public getStampsSlotNumber(): Observable<CommonSelect[]> {
    return this.http.get('assets/actives/stamps/stamp-slot-number.json')
      .pipe(
        map(res => (res as CommonSelect[]))
      );
  }

  public getStampsNumber(): Observable<CommonSelect[]> {
    return this.http.get('assets/actives/stamps/stamp-number.json')
      .pipe(
        map(res => (res as CommonSelect[]))
      );
  }

  public getStampsData() {
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

}
