import { Observable, of } from 'rxjs';
import { IComm, ICommMessage } from '@cl-core/models/comm/schedule';
import {
  IJsonApiItemPayload, IWCommEventAttributes, IWCommMessageAttributes, IWCommTemplateAttributes, WMessageChannel
} from '@perx/whistler';
import { ICampaign } from '@cl-core/models/campaign/campaign';

export class MockCommsServices {

  public getMockData(): ICommMessage {
    return {
      id: '1',
    from: 'test',
    to: 'test',
    provider_id: 5,
    message: 'test',
    sendDate: null,
    owner_id: '5',
    owner_type: 'test',
    channel: WMessageChannel.sms
    };
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<ICommMessage>> {
    console.log(params);
    return of(
      {
        data: [this.getMockData()],
        meta: {}
      }
    );
  }

  public getCommsTemplate(params: HttpParamsOptions): Observable<IComm[]> {
    console.log(params);
    return of(
      [this.getMockData()]
    );
  }

  public getCommsEvents(params: HttpParamsOptions): Observable<IComm[]> {
    console.log(params);
    return of(
      [this.getMockData()]
    );
  }

  public getCommsEvent(params: HttpParamsOptions): Observable<IComm> {
    console.log(params);
    return of(
      this.getMockData()
    );
  }

  public createCommsEvent(data: ICampaign, templateId: string, campaignId: string): Observable<IJsonApiItemPayload<IWCommEventAttributes>> {
    console.log(data, templateId, campaignId);
    return of(null);
  }

  public deleteCommsEvent(id: string): Observable<any> {
    console.log(id);
    return of(null);
  }

  public updateCommsTemplate(data: IComm): Observable<IJsonApiItemPayload<IWCommTemplateAttributes>> {
    console.log(data);
    return of(null);
  }

  public createCommsTemplate(data: IComm): Observable<IJsonApiItemPayload<IWCommTemplateAttributes>> {
    console.log(data);
    return of(null);
  }

  public deleteCommsTemplate(id: string): Observable<void> {
    console.log(id);
    return of(null);
  }

  public createMessage(data: ICommMessage): Observable<IJsonApiItemPayload<IWCommMessageAttributes>> {
    console.log(data);
    return of(null);
  }

  public getMessages(params: HttpParamsOptions): Observable<ICommMessage[]> {
    console.log(params);
    return of([this.getMockData()]);
  }

  public getMessage(id: string): Observable<ICommMessage> {
    console.log(id);
    return of(this.getMockData());
  }

}
