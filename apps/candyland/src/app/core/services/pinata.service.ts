import { Injectable } from '@angular/core';
import { PinataHttpService } from '@cl-core/http-services/pinata-http.service';
import { Observable } from 'rxjs';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { map } from 'rxjs/operators';

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

  public getPinata(id: string): Observable<any> {
    return this.pinataHttpService.getPinata(id).pipe(
      map(response => EngagementHttpAdapter.transformPinataForm(response.data))
    );
  }

  public createPinata(data: any): any {
    const sendData = EngagementHttpAdapter.transformPinata(data);
    return this.pinataHttpService.createPinata({ data: sendData });
  }

  public updatePinata(id: string, data: any): Observable<IResponseApi<any>> {
    const sendData = EngagementHttpAdapter.transformPinata(data);
    sendData.id = id;
    return this.pinataHttpService.updatePinata(id, {data: sendData});
  }
}
