import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStatusLabelConfig } from '@perxtech/candyshop';

@Injectable({
  providedIn: 'root'
})
export class ConfigHttpService {

  constructor(private http: HttpClient) { }

  public getStatusLabel(): Observable<IStatusLabelConfig> {
    return this.http.get<IStatusLabelConfig>('/assets/actives/statuses-type/statuses-type.json');
  }
}
