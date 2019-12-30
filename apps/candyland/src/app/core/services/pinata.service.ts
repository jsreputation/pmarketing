import { Injectable } from '@angular/core';
import { PinataHttpService } from '@cl-core/http-services/pinata-http.service';
import { Observable } from 'rxjs';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { map } from 'rxjs/operators';
import { IWPinataGameEngagementAttributes, IJsonApiItemPayload } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class PinataService {

  constructor(private pinataHttpService: PinataHttpService) {
  }

  public getPinataData(): Observable<IGameDefaultData> {
    return this.pinataHttpService.getPinataData();
  }

  public getPinata(id: string): Observable<IPinataForm> {
    return this.pinataHttpService.getPinata(id).pipe(
      map(response => EngagementHttpAdapter.transformPinataForm(response.data))
    );
  }

  public createPinata(data: IPinataForm): Observable<IJsonApiItemPayload<IWPinataGameEngagementAttributes>> {
    const sendData = EngagementHttpAdapter.transformFromPinataForm(data);
    return this.pinataHttpService.createPinata({ data: sendData });
  }

  public updatePinata(id: string, data: IPinataForm): Observable<IJsonApiItemPayload<IWPinataGameEngagementAttributes>> {
    const sendData = { ...EngagementHttpAdapter.transformFromPinataForm(data), id };
    return this.pinataHttpService.updatePinata(id, { data: sendData });
  }
}
