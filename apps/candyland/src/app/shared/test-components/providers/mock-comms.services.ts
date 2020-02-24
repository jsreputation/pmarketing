import { Observable, of } from 'rxjs';
import { IComm, ICommMessage } from '@cl-core/models/comm/schedule';
import {
  IJsonApiItemPayload, IWCommEventAttributes, IWCommMessageAttributes, IWCommTemplateAttributes, WMessageChannel
} from '@perx/whistler';
import { ITableData } from '@cl-core/models/data-list.interface';
import { CommsService } from '@cl-core-services';

export class MockCommsServices implements Partial<CommsService> {
  private getMockData(): ICommMessage {
    return {
      id: '1',
      from: 'test',
      to: 'test',
      providerId: 5,
      message: 'test',
      sendDate: null,
      ownerId: '5',
      ownerType: 'test',
      channel: WMessageChannel.sms
    };
  }

  public getTableData(): Observable<ITableData<ICommMessage>> {
    return of(
      {
        data: [this.getMockData()],
        meta: {}
      }
    );
  }

  public getCommsTemplate(): Observable<IComm[]> {
    return of(
      [this.getMockData()]
    );
  }

  public getCommsEvents(): Observable<IComm[]> {
    return of(
      [this.getMockData()]
    );
  }

  public getCommsEvent(): Observable<IComm> {
    return of(
      this.getMockData()
    );
  }

  public createCommsEvent(): Observable<IJsonApiItemPayload<IWCommEventAttributes>> {
    return of(null);
  }

  public deleteCommsEvent(): Observable<any> {
    return of(null);
  }

  public updateCommsTemplate(): Observable<IJsonApiItemPayload<IWCommTemplateAttributes>> {
    return of(null);
  }

  public createCommsTemplate(): Observable<IJsonApiItemPayload<IWCommTemplateAttributes>> {
    return of(null);
  }

  public deleteCommsTemplate(): Observable<void> {
    return of(null);
  }

  public createMessage(): Observable<IJsonApiItemPayload<IWCommMessageAttributes>> {
    return of(null);
  }

  public getMessages(): Observable<ICommMessage[]> {
    return of([this.getMockData()]);
  }

  public getMessage(): Observable<ICommMessage> {
    return of(this.getMockData());
  }
}
