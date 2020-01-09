import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { CommsHttpsService } from '@cl-core/http-services/comms-https.service';
import { map } from 'rxjs/operators';
import { CommsHttpAdapter } from '@cl-core/http-adapters/comms-http-adapter';
import {
  IWCommTemplateAttributes,
  IWCommEventAttributes,
  IJsonApiListPayload,
  IJsonApiItem,
  IJsonApiItemPayload,
  IJsonApiPatchData,
  IJsonApiPostData
} from '@perx/whistler';
import { IComm, ICommMessage } from '@cl-core/models/comm/schedule';
import { ICampaign } from '@cl-core/models/campaign/campaign';
import { IWCommMessageAttributes } from '@perx/whistler/dist/whistler/lib/comm/comm';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';

@Injectable({
  providedIn: 'root'
})
export class CommsService implements ITableService<ICommMessage>{

  constructor(private commsHttpsService: CommsHttpsService) {
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<ICommMessage>> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.commsHttpsService.getMessages(httpParams).pipe(
      map((response: IJsonApiListPayload<IWCommMessageAttributes>) => CommsHttpAdapter.transformTableData(response))
    );
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

  public createCommsEvent(data: ICampaign, templateId: string, campaignId: string): Observable<IJsonApiItemPayload<IWCommEventAttributes>> {
    const sendData: IJsonApiPostData<IWCommEventAttributes> = CommsHttpAdapter.transformFromCommsEvents(data, templateId, campaignId);
    return this.commsHttpsService.createCommsEvent({ data: sendData });
  }

  public deleteCommsEvent(id: string): Observable<any> {
    return this.commsHttpsService.deleteCommsEvent(id);
  }

  public updateCommsTemplate(data: IComm): Observable<IJsonApiItemPayload<IWCommTemplateAttributes>> {
    const sendData: IJsonApiPatchData<IWCommTemplateAttributes> = {
      ...CommsHttpAdapter.transformFromCommsTemplates(data),
      id: data.templateId
    };
    return this.commsHttpsService.updateCommsTemplate(data.templateId, { data: sendData });
  }

  public createCommsTemplate(data: IComm): Observable<IJsonApiItemPayload<IWCommTemplateAttributes>> {
    const sendData: IJsonApiPostData<IWCommTemplateAttributes> = CommsHttpAdapter.transformFromCommsTemplates(data);
    return this.commsHttpsService.createCommsTemplate({ data: sendData });
  }

  public deleteCommsTemplate(id: string): Observable<void> {
    return this.commsHttpsService.deleteCommsTemplate(id);
  }

  public createMessage(data: ICommMessage): Observable<IJsonApiItemPayload<IWCommMessageAttributes>> {
    const sendData: IJsonApiPostData<IWCommMessageAttributes> = CommsHttpAdapter.transformFromCommsMessage(data);
    return this.commsHttpsService.createMessage({ data: sendData });
  }

  public getMessages(params: HttpParamsOptions): Observable<ICommMessage[]> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.commsHttpsService.getMessages(httpParams).pipe(
      map((response: IJsonApiListPayload<IWCommMessageAttributes>) => response.data),
      map((response: IJsonApiItem<IWCommMessageAttributes>[]) =>
        response.map((message: IJsonApiItem<IWCommMessageAttributes>) => CommsHttpAdapter.transformMessageAPIResponse(message)))
    );
  }

  public getMessage(id: string): Observable<ICommMessage> {
    return this.commsHttpsService.getMessage(id).pipe(
      map((response: IJsonApiItemPayload<IWCommMessageAttributes>) => response.data),
      map((response: IJsonApiItem<IWCommMessageAttributes>) => CommsHttpAdapter.transformMessageAPIResponse(response))
    );
  }

}
