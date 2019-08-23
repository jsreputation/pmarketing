import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PinataHttpService {

  constructor(private http: HttpClient) { }

  public getPinataData(): Observable<{
    pinata: IGraphic[],
    background: IGraphic[]
  }> {
    return this.http.get<{
      pinata: IGraphic[],
      background: IGraphic[]
    }>('assets/actives/pinata/pinata-data.json');
  }

  public createPinata(data: any): any {
    return this.http.post(ApiConfig.engagementsPath, data);
  }
}
