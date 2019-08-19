import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigPathService } from '@cl-core-services';
import { IGameGifts } from '../../engagements/games/containers/new-shake-page/shared/models/game-gifts.model';

@Injectable({
  providedIn: 'root'
})
export class ShakeHttpService {

  constructor(private http: HttpClient) { }

  public getData(): Observable<{
    gameNumberGift: IGameGifts[],
    gamesTree: IGraphic[],
    giftBox: IGraphic[],
    'background': IGraphic[]
  }> {
    return this.http.get<{
      gameNumberGift: IGameGifts[],
      gamesTree: IGraphic[],
      giftBox: IGraphic[],
      'background': IGraphic[]
    }>('assets/actives/shake-tree/data.json');
  }

  public createShakeTree(data: any): Observable<any> {
    return this.http.post(ConfigPathService.createGamePath, data);
  }
}
