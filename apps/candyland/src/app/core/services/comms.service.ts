import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { CommsHttpsService } from '@cl-core/http-services/comms-https.service';
import { map } from 'rxjs/operators';
import { CommsHttpAdapter } from '@cl-core/http-adapters/comms-http-adapter';
import { ICommTemplateAttributes, IComm, ICommEventAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class CommsService {

  constructor(private commsHttpsService: CommsHttpsService) {
  }

  public getCommsTemplate(params: HttpParamsOptions): Observable<IComm[]> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.commsHttpsService.getCommsTemplates(httpParams).pipe(
      map((response: IJsonApiListPayload<ICommTemplateAttributes>) => response.data),
      map((response: IJsonApiItem<ICommTemplateAttributes>[]) =>
        response.map((comm: IJsonApiItem<ICommTemplateAttributes>) => CommsHttpAdapter.transformTemplateAPIResponseToComm(comm)))
    );
  }

  public getCommsEvents(params: HttpParamsOptions): Observable<IComm[]> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.commsHttpsService.getCommsEvents(httpParams).pipe(
      map((response: IJsonApiListPayload<ICommEventAttributes>) => response.data),
      map((response: IJsonApiItem<ICommEventAttributes>[]) =>
        response.map((comm: IJsonApiItem<ICommEventAttributes>) => CommsHttpAdapter.transformEventAPIResponseToComm(comm)))
    );
  }

}
