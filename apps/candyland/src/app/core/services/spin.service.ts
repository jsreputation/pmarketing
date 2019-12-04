import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { map } from 'rxjs/operators';
import {SpinHttpService} from '@cl-core/http-services/spin-http.service';
import {IWSpinGameEngagementAttributes} from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class SpinService {

  constructor(private spinHttpService: SpinHttpService) {
  }

  public getSpinData(): Observable<ISpinDefaultValue> {
    return this.spinHttpService.getSpinData();
  }

  public getSpin(id: string): Observable<Partial<ISpinEntityForm>> {
    return this.spinHttpService.getSpin(id).pipe(
      map(response => EngagementHttpAdapter.transformSpinForm(response.data))
    );
  }

  public createSpin(data: ISpinEntityForm): Observable<IJsonApiPayload<IWSpinGameEngagementAttributes>> {
    const sentData = EngagementHttpAdapter.transformFromSpinForm(data);
    return this.spinHttpService.createSpin({data: sentData});
  }

  public updateSpin(id: string, data: ISpinEntityForm): Observable<IJsonApiPayload<IWSpinGameEngagementAttributes>> {
    const sendData = EngagementHttpAdapter.transformFromSpinForm(data);
    sendData.id = id;
    return this.spinHttpService.updateSpin(id, {data: sendData});
  }
}
