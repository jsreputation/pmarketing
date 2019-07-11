import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGraphic } from '@cl-shared/models/graphick.model';
import { map } from 'rxjs/operators';
import { IGameGifts } from '../models/game-gifts.model';

@Injectable()
export class ShakeDataService {

  constructor(private http: HttpClient) { }

  public getBackground(): Observable<IGraphic[]> {
    return this.http.get('assets/actives/background.json')
      .pipe(map((response) => (response as IGraphic[])));
  }

  public getGiftBox(): Observable<IGraphic[]> {
    return this.http.get('assets/actives/gift-box.json')
      .pipe(map((response) => (response as IGraphic[])));
  }

  public getGamesTree(): Observable<IGraphic[]> {
    return this.http.get('assets/actives/games-tree.json')
      .pipe(map((response) => (response as IGraphic[])));
  }

  public getGameNumberGifts(): Observable<IGameGifts[]> {
    return this.http.get('assets/actives/game-number-gift.json')
      .pipe(map((response) => (response as IGameGifts[])));
  }
}
