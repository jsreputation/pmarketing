import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGameGifts } from '../models/game-gifts.model';

@Injectable()
export class ShakeDataService {

  constructor(private http: HttpClient) { }

  public getData() {
    return this.http.get<{
      gameNumberGift: IGameGifts[],
      gamesTree: IGraphic[],
      giftBox: IGraphic[],
      'background': IGraphic[]
    }>('assets/actives/shake-tree/data.json');
  }
}
