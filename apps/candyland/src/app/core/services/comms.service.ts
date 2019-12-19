import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { CommsHttpsService } from '@cl-core/http-services/comms-https.service';
import { map } from 'rxjs/operators';
import { CommsHttpAdapter } from '@cl-core/http-adapters/comms-http-adapter';
import { IWCommTemplateAttributes, IWCommEventAttributes, IJsonApiListPayload, IJsonApiItem, IJsonApiItemPayload } from '@perx/whistler';
import { IComm } from '@cl-core/models/comm/schedule';
import { ICampaign } from '@cl-core/models/campaign/campaign';

@Injectable({
  providedIn: 'root'
})
export class CommsService {

  constructor(private commsHttpsService: CommsHttpsService) {
  }

  public getCommsTemplate(params: HttpParamsOptions): Observable<IComm[]> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.commsHttpsService.getCommsTemplates(httpParams).pipe(
      map((response: IJsonApiListPayload<IWCommTemplateAttributes>) => response.data),
      map((response: IJsonApiItem<IWCommTemplateAttributes>[]) =>
        response.map((comm: IJsonApiItem<IWCommTemplateAttributes>) => CommsHttpAdapter.transformTemplateAPIResponseToComm(comm)))
    );
  }

  public getCommsEvents(params: HttpParamsOptions): Observable<IComm[]> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.commsHttpsService.getCommsEvents(httpParams).pipe(
      map((response: IJsonApiListPayload<IWCommEventAttributes>) => response.data),
      map((response: IJsonApiItem<IWCommEventAttributes>[]) =>
        response.map((comm: IJsonApiItem<IWCommEventAttributes>) => CommsHttpAdapter.transformEventAPIResponseToComm(comm)))
    );
  }

  public getCommsEvent(params: HttpParamsOptions): Observable<IComm> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.commsHttpsService.getCommsEvents(httpParams).pipe(
      map((response: IJsonApiListPayload<IWCommEventAttributes>) => [response.data[0], response.included ? response.included[0] : null]),
      map(([commsEventData, commsTemplateData]: [IJsonApiItem<IWCommEventAttributes>, IJsonApiItem<IWCommTemplateAttributes> | null]) => {
        const eventData = commsEventData && CommsHttpAdapter.transformEventAPIResponseToComm(commsEventData);
        const templateData = commsTemplateData && CommsHttpAdapter.transformTemplateAPIResponseToComm(commsTemplateData) || {};
        return {
          ...eventData,
          ...templateData
        };
      })
    );
  }

  public updateCommsEvent(data: ICampaign, templateId: string, campaignId: string): Observable<IJsonApiItemPayload<IWCommEventAttributes>> {
    const sendData = CommsHttpAdapter.transformFromCommsEvents(data, templateId, campaignId);
    return this.commsHttpsService.updateCommsEvent(data.channel.eventId, { data: { id: data.channel.eventId, ...sendData } });
  }

  public createCommsEvent(data: ICampaign, templateId: string, campaignId: string): Observable<IJsonApiItemPayload<IWCommEventAttributes>> {
    const sendData = CommsHttpAdapter.transformFromCommsEvents(data, templateId, campaignId);
    return this.commsHttpsService.createCommsEvent({ data: sendData });
  }

  public deleteCommsEvent(id: string): Observable<any> {
    return this.commsHttpsService.deleteCommsEvent(id);
  }

  public updateCommsTemplate(data: IComm): Observable<IJsonApiItemPayload<IWCommTemplateAttributes>> {
    const sendData = CommsHttpAdapter.transformFromCommsTemplates(data);
    return this.commsHttpsService.updateCommsTemplate(data.templateId, { data: { id: data.templateId, ...sendData } });
  }

  public createCommsTemplate(data: IComm): Observable<IJsonApiItemPayload<IWCommTemplateAttributes>> {
    const sendData = CommsHttpAdapter.transformFromCommsTemplates(data);
    return this.commsHttpsService.createCommsTemplate({ data: sendData });
  }

  public deleteCommsTemplate(id: string): Observable<IJsonApiItemPayload<IWCommTemplateAttributes>> {
    return this.commsHttpsService.deleteCommsTemplate(id);
  }
}
