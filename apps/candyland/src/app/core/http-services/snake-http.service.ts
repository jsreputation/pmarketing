import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWSnakeGameEngagementAttributes, IJsonApiItemPayload, IJsonApiPatchItem, IJsonApiPostItem } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class SnakeHttpService {

  constructor(private http: HttpClient) {
  }

  public getSnakeData(): Observable<IGameDefaultData> {
    return this.http.get<IGameDefaultData>('assets/actives/snake/snake-data.json');
  }

  public createSnake(data: IJsonApiPostItem<IWSnakeGameEngagementAttributes>):
    Observable<IJsonApiItemPayload<IWSnakeGameEngagementAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWSnakeGameEngagementAttributes>>(ApiConfig.engagementsPath + '/', data);
  }

  public updateSnake(id: string, data: IJsonApiPatchItem<IWSnakeGameEngagementAttributes>):
    Observable<IJsonApiItemPayload<IWSnakeGameEngagementAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWSnakeGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id, data);
  }

  public getSnake(id: string): Observable<IJsonApiItemPayload<IWSnakeGameEngagementAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWSnakeGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id);
  }
}
