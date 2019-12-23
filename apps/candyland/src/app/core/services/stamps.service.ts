import { Injectable } from '@angular/core';
import { StampHttpService } from '@cl-core/http-services/stamp-http.service';
import { Observable } from 'rxjs';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { map } from 'rxjs/operators';
import { IWStampEngagementAttributes, IJsonApiItemPayload } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class StampsService {

  constructor(private stampHttpService: StampHttpService) {
  }

  public getStampsData(): Observable<IStampsDefaultValue> {
    return this.stampHttpService.getStampsData();
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
    return this.stampHttpService.getStampsReport(id);
  }
}
