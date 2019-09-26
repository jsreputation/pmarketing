import { Injectable } from '@angular/core';
import { StampHttpService } from '@cl-core/http-services/stamp-http.service';
import { Observable } from 'rxjs';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StampsService {

  constructor(private stampHttpService: StampHttpService) { }

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
    return this.stampHttpService.getStampsData();
  }

  public getStamp(id: string): Observable<any> {
    return this.stampHttpService.getStamp(id).pipe(
      map(response => EngagementHttpAdapter.transformStampForm(response.data))
    );
  }

  public createStamp(data: IStampsEntityForm): Observable<IResponseApi<IEngagementApi>> {
    const sentData = EngagementHttpAdapter.transformStamp(data);
    return this.stampHttpService.createStamp({data: sentData});
  }

  public updateStamp(id: string, data: any): Observable<IResponseApi<any>> {
    const sendData = EngagementHttpAdapter.transformStamp(data);
    sendData.id = id;
    return this.stampHttpService.updateStamp(id, {data: sendData});
  }
}
