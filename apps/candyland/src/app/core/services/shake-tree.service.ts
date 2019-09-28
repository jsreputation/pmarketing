import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGameGifts } from '../../engagements/games/containers/new-shake-page/shared/models/game-gifts.model';
import { ShakeHttpService } from '@cl-core/http-services/shake-http.service';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';

@Injectable({
  providedIn: 'root'
})
export class ShakeTreeService {

  constructor(private shakeHttpService: ShakeHttpService) {
  }

  public getData(): Observable<{
    gameNumberGift: IGameGifts[],
    gamesTree: IGraphic[],
    giftBox: IGraphic[],
    'background': IGraphic[]
  }> {
    return this.shakeHttpService.getData();
  }

  public getShakeTree(id: string): Observable<IResponseApi<IEngagementApi>> {
    return this.shakeHttpService.getShakeTree(id).pipe(
      map(response => EngagementHttpAdapter.transformShakeTreeForm(response.data))
    );
  }

  public createShakeTree(data: any): Observable<IResponseApi<IEngagementApi>> {
    const sendData = EngagementHttpAdapter.transformShakeTheTree(data);
    return this.shakeHttpService.createShakeTree({data: sendData});
  }

  public updateShakeTree(id: string, data: any): Observable<IResponseApi<IEngagementApi>> {
    const sendData = EngagementHttpAdapter.transformShakeTheTree(data);
    sendData.id = id;
    return this.shakeHttpService.updateShakeTree(id, {data: sendData});
  }
}
