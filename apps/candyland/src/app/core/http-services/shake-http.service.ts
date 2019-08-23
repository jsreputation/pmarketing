import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
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
    return this.http.post(ApiConfig.createGamePath, data);
  }
}
