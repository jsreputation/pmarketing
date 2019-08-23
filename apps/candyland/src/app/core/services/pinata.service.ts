import { Injectable } from '@angular/core';
import { PinataHttpService } from '@cl-core/http-services/pinata-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PinataService {

  constructor(private pinataHttpService: PinataHttpService) { }

  public getPinataData(): Observable<{
    pinata: IGraphic[],
    background: IGraphic[]
  }> {
    return this.pinataHttpService.getPinataData();
  }

  public createPinata(data: any): any {
    return this.pinataHttpService.createPinata(data);
  }
}
