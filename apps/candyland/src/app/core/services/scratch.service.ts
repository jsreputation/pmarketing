import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { ScratchHttpService } from '@perx/whistler-services';
import { IWScratchGameEngagementAttributes, IJsonApiItemPayload } from '@perx/whistler';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScratchService {

  constructor(private scratchHttpService: ScratchHttpService,
    private http: HttpClient) {
  }

  public getScratchData(): Observable<IGameDefaultData> {
    return this.http.get<IGameDefaultData>('assets/actives/scratch/scratch-data.json');
  }

  public getScratch(id: string): Observable<IScratchForm> {
    return this.scratchHttpService.getScratch(id).pipe(
      map(response => EngagementHttpAdapter.transformScratchForm(response.data))
    );
  }

  public createScratch(data: IScratchForm): Observable<IJsonApiItemPayload<IWScratchGameEngagementAttributes>> {
    const sendData = EngagementHttpAdapter.transformFromScratchForm(data);
    return this.scratchHttpService.createScratch({ data: sendData });
  }

  public updateScratch(id: string, data: IScratchForm): Observable<IJsonApiItemPayload<IWScratchGameEngagementAttributes>> {
    const sendData = { ...EngagementHttpAdapter.transformFromScratchForm(data), id };
    return this.scratchHttpService.updateScratch(id, { data: sendData });
  }
}
