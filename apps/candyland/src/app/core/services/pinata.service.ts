import { Injectable } from '@angular/core';
import { PinataHttpService } from '@perx/whistler-services';
import { Observable } from 'rxjs';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { map } from 'rxjs/operators';
import { IWPinataGameEngagementAttributes, IJsonApiItemPayload } from '@perx/whistler';
import { HttpClient } from '@angular/common/http';
import { IPinataForm } from '@cl-core/models/games/pinata/pinate-form.interface';
import { IGameDefaultData } from '@cl-core/models/games/game-default-data.interface';
import { IGraphic } from '@cl-core/models/graphic.interface';

@Injectable({
  providedIn: 'root'
})
export class PinataService {
  constructor(private pinataHttpService: PinataHttpService, private http: HttpClient) { }

  public getPinataData(): Observable<IGameDefaultData> {
    return this.http.get<{
      pinata: IGraphic[],
      background: IGraphic[]
    }>('assets/actives/pinata/pinata-data.json');
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
