import { Injectable } from '@angular/core';
import { PinataHttpService } from '@cl-core/http-services/pinata-http.service';
import { Observable } from 'rxjs';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';

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
    const sendData = EngagementHttpAdapter.transformPinata(data);
    return this.pinataHttpService.createPinata({ data: sendData });
  }
}
