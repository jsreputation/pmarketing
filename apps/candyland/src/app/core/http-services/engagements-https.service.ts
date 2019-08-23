import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfigPathService } from '@cl-core/services/config-path.service';

@Injectable({
  providedIn: 'root'
})
export class EngagementsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getEngagements(): Observable<any> {
    return this.http.get(ConfigPathService.engagementsPath);
  }

  public getEngagementType(): Observable<any> {
    return this.http.get('assets/actives/engagement-type.json')
      .pipe(
        map(res => (res as IGraphic[]))
      );
  }

  public getGamesType(): Observable<any> {
    return this.http.get('assets/actives/games-type.json')
      .pipe(
        map(res => (res as IGraphic[]))
      );
  }
}
