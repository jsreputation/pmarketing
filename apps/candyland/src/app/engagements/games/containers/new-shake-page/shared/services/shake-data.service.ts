import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGameGifts } from '../models/game-gifts.model';
import { Observable } from 'rxjs';

@Injectable()
export class ShakeDataService {

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
}
