import { Injectable } from '@angular/core';
import { SnakeHttpService } from '@cl-core/http-services/snake-http.service';
import { Observable } from 'rxjs';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { map } from 'rxjs/operators';
import { IWSnakeGameEngagementAttributes, IJsonApiItemPayload } from '@perx/whistler';
import { ISnakeForm } from '@cl-core/models/games/snake/snake-form';
import { IGameDefaultData } from '@cl-core/models/games/game-default-data.interface';

@Injectable({
  providedIn: 'root'
})
export class SnakeService {

  constructor(private snakeHttpService: SnakeHttpService) {
  }

  public getSnakeData(): Observable<IGameDefaultData> {
    return this.snakeHttpService.getSnakeData();
  }

  public getSnake(id: string): Observable<ISnakeForm> {
    return this.snakeHttpService.getSnake(id).pipe(
      map(response => EngagementHttpAdapter.transformSnakeForm(response.data))
    );
  }

  public createSnake(data: ISnakeForm): Observable<IJsonApiItemPayload<IWSnakeGameEngagementAttributes>> {
    const sendData = EngagementHttpAdapter.transformFromSnakeForm(data);
    return this.snakeHttpService.createSnake({ data: sendData });
  }

  public updateSnake(id: string, data: ISnakeForm): Observable<IJsonApiItemPayload<IWSnakeGameEngagementAttributes>> {
    const sendData = { ...EngagementHttpAdapter.transformFromSnakeForm(data), id };
    return this.snakeHttpService.updateSnake(id, { data: sendData });
  }
}
