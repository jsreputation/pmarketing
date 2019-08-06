import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PinataHttpService {

  constructor(private http: HttpClient) { }

  public getPinataData() {
    return this.http.get<{
      pinata: IGraphic[],
      background: IGraphic[]
    }>('assets/actives/pinata/pinata-data.json');
  }
}
