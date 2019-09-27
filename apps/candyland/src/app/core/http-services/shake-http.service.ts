import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { IGameGifts } from '../../engagements/games/containers/new-shake-page/shared/models/game-gifts.model';
import { Observable } from 'rxjs';

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
    return this.http.post(ApiConfig.engagementsPath + '/', data);
  }

  public updateShakeTree(id: string, data: IResponseApi<any>): Observable<any> {
    return this.http.patch<IResponseApi<any>>(ApiConfig.engagementsPath + '/game/' + id, data);
  }

  public getShakeTree(id: string): Observable<any> {
    return this.http.get(ApiConfig.engagementsPath + '/game/' + id);
  }
}
