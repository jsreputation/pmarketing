import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  public createShakeTree(data: any): Observable<any> {
    const sendData = EngagementHttpAdapter.transformShakeTheTree(data);
    return this.shakeHttpService.createShakeTree({data: sendData});
  }
}
