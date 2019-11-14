import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { ScratchHttpService } from '@cl-core/http-services/scratch-http.service';
import { IWScratchGameEngagementAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class ScratchService {

  constructor(private scratchHttpService: ScratchHttpService) {
  }

  public getScratchData(): Observable<IGameDefaultData> {
    return this.scratchHttpService.getScratchData();
  }

  public getScratch(id: string): Observable<IScratchForm> {
    return this.scratchHttpService.getScratch(id).pipe(
      map(response => EngagementHttpAdapter.transformScratchForm(response.data))
    );
  }

  public createScratch(data: IScratchForm): Observable<IJsonApiPayload<IWScratchGameEngagementAttributes>> {
    const sendData = EngagementHttpAdapter.transformFromScratchForm(data);
    return this.scratchHttpService.createScratch({data: sendData});
  }

  public updateScratch(id: string, data: IScratchForm): Observable<IJsonApiPayload<IWScratchGameEngagementAttributes>> {
    const sendData = EngagementHttpAdapter.transformFromScratchForm(data);
    sendData.id = id;
    return this.scratchHttpService.updateScratch(id, {data: sendData});
  }
}
