import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShakeHttpService } from '@perxtech/whistler-services';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { IWTreeGameEngagementAttributes, IJsonApiItemPayload } from '@perxtech/whistler';
import { HttpClient } from '@angular/common/http';
import { IGameDefaultData } from '@cl-core/models/games/game-default-data.interface';
import { IShakeTree } from '@cl-core/models/games/shake-tree/shakeTree.interface';

@Injectable({
  providedIn: 'root'
})
export class ShakeTreeService {
  constructor(private shakeHttpService: ShakeHttpService, private http: HttpClient) { }

  public getData(): Observable<IGameDefaultData> {
    return this.http.get<IGameDefaultData>('assets/actives/shake-tree/data.json');
  }

  public getShakeTree(id: string): Observable<IShakeTree> {
    return this.shakeHttpService.getShakeTree(id).pipe(
      map((response: any) => EngagementHttpAdapter.transformShakeTreeForm(response.data))
    );
  }

  public createShakeTree(data: any): Observable<IJsonApiItemPayload<IWTreeGameEngagementAttributes>> {
    const sendData = EngagementHttpAdapter.transformFromShakeTheTreeForm(data);
    return this.shakeHttpService.createShakeTree({ data: sendData });
  }

  public updateShakeTree(id: string, data: any): Observable<IJsonApiItemPayload<IWTreeGameEngagementAttributes>> {
    const sendData = { ...EngagementHttpAdapter.transformFromShakeTheTreeForm(data), id };
    return this.shakeHttpService.updateShakeTree(id, { data: sendData });
  }
}
