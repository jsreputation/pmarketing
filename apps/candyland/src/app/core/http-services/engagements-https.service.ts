import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { IGraphic } from '@cl-shared/models/graphick.model';

@Injectable({
  providedIn: 'root'
})
export class EngagementsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getEngagements() {
    return this.http.get('assets/mocks/engagements.json');
  }

  public getEngagementType() {
    return this.http.get('assets/actives/engagement-type.json')
      .pipe(
        map(res => (res as IGraphic[])),
        tap( data => console.log('tset', data))
      );
  }


  public getGamesType() {
    return this.http.get('assets/actives/games-type.json')
      .pipe(
        map(res => (res as IGraphic[]))
      );
  }
}
