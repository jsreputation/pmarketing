import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PinataHttpService {

  constructor(private http: HttpClient) { }

  public getPinata(): Observable<IGraphic> {
    return this.http.get('assets/actives/pinata.json')
      .pipe(
        map(res => (res as IGraphic))
      );
  }

  public getBackground(): Observable<IGraphic> {
    return this.http.get('assets/actives/pinata_bg.json')
      .pipe(
        map(res => (res as IGraphic))
      );
  }
}
