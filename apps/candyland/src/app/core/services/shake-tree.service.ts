import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShakeHttpService } from '@cl-core/http-services/shake-http.service';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';

@Injectable({
  providedIn: 'root'
})
export class ShakeTreeService {

  constructor(private shakeHttpService: ShakeHttpService) {
  }

  public getData(): Observable<IGameDefaultData> {
    return this.shakeHttpService.getData();
  }

  public getShakeTree(id: string): Observable<IShakeTree> {
    return this.shakeHttpService.getShakeTree(id).pipe(
      map((response: any) => EngagementHttpAdapter.transformShakeTreeForm(response.data))
    );
  }

  public createShakeTree(data: any): Observable<IResponseApi<IEngagementApi>> {
    const sendData = EngagementHttpAdapter.transformFromShakeTheTreeForm(data);
    return this.shakeHttpService.createShakeTree({data: sendData});
  }

  public updateShakeTree(id: string, data: any): Observable<IResponseApi<IEngagementApi>> {
    const sendData = EngagementHttpAdapter.transformFromShakeTheTreeForm(data);
    sendData.id = id;
    return this.shakeHttpService.updateShakeTree(id, {data: sendData});
  }
}
