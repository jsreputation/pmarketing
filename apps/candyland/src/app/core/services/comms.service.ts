import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { CommsHttpsService } from '@cl-core/http-services/comms-https.service';
import { map } from 'rxjs/operators';
import { CommsHttpAdapter } from '@cl-core/http-adapters/comms-http-adapter';

@Injectable({
  providedIn: 'root'
})
export class CommsService {

  constructor(private commsHttpsService: CommsHttpsService) {
  }

  public getComms(params: HttpParamsOptions): Observable<IComm[]> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.commsHttpsService.getComms(httpParams).pipe(
      map(response => response.data),
      map(response => response.map((comm: ICommApi) => CommsHttpAdapter.transformAPIResponseToComm(comm)))
    );
  }
}
