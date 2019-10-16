import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { CommsHttpsService } from '@cl-core/http-services/comms-https.service';
import { map } from 'rxjs/operators';
import { CommsHttpAdapter } from '@cl-core/http-adapters/comms-http-adapter';
import { ICommTemplateAttributes, ICommEventAttributes } from '@perx/whistler';
import { IComm } from '@cl-core/models/comm/schedule';

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

  public getCommsEvent(params: HttpParamsOptions): Observable<IComm> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.commsHttpsService.getCommsEvents(httpParams).pipe(
      map((response: IJsonApiListPayload<ICommEventAttributes>) => [response.data[0], response.included[0]]),
      map(([commsEventData, commsTemplateData]: [IJsonApiItem<ICommEventAttributes>, IJsonApiItem<ICommTemplateAttributes>]) => {
        const eventData = commsEventData && CommsHttpAdapter.transformEventAPIResponseToComm(commsEventData);
        const templateData = commsTemplateData && CommsHttpAdapter.transformTemplateAPIResponseToComm(commsTemplateData);
        return {
          ...eventData,
          ...templateData
        };
      })
    );
  }

}
