import { Injectable } from '@angular/core';
import { StampHttpService } from '@cl-core/http-services/stamp-http.service';
import { Observable } from 'rxjs';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';

@Injectable({
  providedIn: 'root'
})
export class StampsService {

  constructor(private stampService: StampHttpService) { }

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
    return this.stampService.getStampsData();
  }

  public createStamp(data: IStampsEntityForm): Observable<IResponseApi<IEngagementApi>> {
    const sentData = EngagementHttpAdapter.transformStamp(data);
    return this.stampService.createStamp({data: sentData});
  }
}
