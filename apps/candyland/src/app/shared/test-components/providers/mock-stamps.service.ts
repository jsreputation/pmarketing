import { Observable, of } from 'rxjs';
import {
  IJsonApiItemPayload, IWStampEngagementAttributes
} from '@perx/whistler';
import { IStampsDefaultValue } from '@cl-core/models/games/stamps/stamps-default-value.interface';
import { IStampsEntityForm } from '@cl-core/models/games/stamps/stamps-entity-form.interface';
import { StampsGraphicData } from '@cl-core/models/reports/stamps-report/stamps-report.interface';

export class MockStampsService {

  public getStampData(id?: string): any {
    return {
      number: [{
        value: id ? +id : 3,
        viewValue: '3 stamps'
      }],
      slotNumber: [{
        value: 1,
        viewValue: '1'
      }],
      cardBackground: [{
        id: 1,
        type: 'card-bg-1',
        title: 'icon',
        img: 'global/assets/card-background/card-bg-1.png',
        fullImg: 'global/assets/card-background/card-bg-1.png',
        format: '.png',
        active: false
      }],
      rewardPost: [{
        id: 1,
        type: 'reward-post-stamp-1',
        title: 'icon',
        img: 'global/assets/stamps/reward-post-stamp-1.png',
        fullImg: 'global/assets/stamps/reward-post-stamp-1.png',
        format: '.png',
        active: false
      }],
      stampsPost: [{
        id: 1,
        type: 'post-stamp-1',
        title: 'icon',
        img: 'global/assets/stamps/post-stamp-1.png',
        fullImg: 'global/assets/stamps/post-stamp-1.png',
        format: '.png',
        active: false
      }],
      rewardPreStamp: [{
        id: 1,
        type: 'reward-pre-stamp-1',
        title: 'icon',
        img: 'global/assets/stamps/reward-pre-stamp-1.png',
        fullImg: 'global/assets/stamps/reward-pre-stamp-1.png',
        format: '.png',
        active: false
      }],
      preStamp: [
        {
          id: 1,
          type: 'pre-stamp-1',
          title: 'icon',
          img: 'global/assets/stamps/pre-stamp-1.png',
          fullImg: 'global/assets/stamps/pre-stamp-1.png',
          format: '.png',
          active: false
        }
      ],
      backgroundStamp: [{
        id: 1,
        type: 'bg-1',
        title: 'icon',
        img: 'global/assets/background/stamp-bg-1.png',
        fullImg: 'global/assets/background/full_bg_1.jpg',
        format: '.png',
        active: false
      }]
    };
  }

  public getStampsData(): Observable<IStampsDefaultValue> {
    return of({
      number: [{
        value: 3,
        viewValue: '3 stamps'
      }],
      slotNumber: [{
        value: 1,
        viewValue: '1'
      }],
      cardBackground: [{
        id: 1,
        type: 'card-bg-1',
        title: 'icon',
        img: 'global/assets/card-background/card-bg-1.png',
        fullImg: 'global/assets/card-background/card-bg-1.png',
        format: '.png',
        active: false
      }],
      rewardPost: [{
        id: 1,
        type: 'reward-post-stamp-1',
        title: 'icon',
        img: 'global/assets/stamps/reward-post-stamp-1.png',
        fullImg: 'global/assets/stamps/reward-post-stamp-1.png',
        format: '.png',
        active: false
      }],
      stampsPost: [{
        id: 1,
        type: 'post-stamp-1',
        title: 'icon',
        img: 'global/assets/stamps/post-stamp-1.png',
        fullImg: 'global/assets/stamps/post-stamp-1.png',
        format: '.png',
        active: false
      }],
      rewardPreStamp: [{
        id: 1,
        type: 'reward-pre-stamp-1',
        title: 'icon',
        img: 'global/assets/stamps/reward-pre-stamp-1.png',
        fullImg: 'global/assets/stamps/reward-pre-stamp-1.png',
        format: '.png',
        active: false
      }],
      preStamp: [
        {
          id: 1,
          type: 'pre-stamp-1',
          title: 'icon',
          img: 'global/assets/stamps/pre-stamp-1.png',
          fullImg: 'global/assets/stamps/pre-stamp-1.png',
          format: '.png',
          active: false
        }
      ],
      backgroundStamp: [{
        id: 1,
        type: 'bg-1',
        title: 'icon',
        img: 'global/assets/background/stamp-bg-1.png',
        fullImg: 'global/assets/background/full_bg_1.jpg',
        format: '.png',
        active: false
      }]
    });
  }

  public getStamp(id: string): Observable<Partial<IStampsEntityForm>> {
    return of(this.getStampData(id));
  }

  public createStamp(data: IStampsEntityForm): Observable<IJsonApiItemPayload<IWStampEngagementAttributes>> {
    console.log('data', data);
    return of(null);
  }

  public updateStamp(id: string, data: IStampsEntityForm): Observable<IJsonApiItemPayload<IWStampEngagementAttributes>> {
    console.log('data', id, data);
    return of(null);
  }

  public getStampsReport(id: string): Observable<StampsGraphicData> {
    return of({
      title: 'First Login Stamps Campaign Response',
      summaryInfo: [{
        title: 'Active Stamp Cards',
        value: id
      }, {
        title: 'Engagement rate',
        value: '8%'
      }, {
        title: 'Average time to complete',
        value: '22.50'
      }],
      total: 2000,
      payload: [
        {
          choices: {
            img_url: 'global/assets/stamps/pre-stamp-1.png',
            text: ''
          },
          amount: 350
        },
        {
          choices: {
            img_url: 'global/assets/stamps/pre-stamp-1.png',
            text: ''
          },
          amount: 200
        },
        {
          choices: {
            img_url: 'global/assets/stamps/pre-stamp-1.png',
            text: ''
          },
          amount: 150
        },
        {
          choices: {
            img_url: 'global/assets/stamps/pre-stamp-1.png',
            text: ''
          },
          amount: 90
        },
        {
          choices: {
            img_url: 'global/assets/stamps/pre-stamp-1.png',
            text: ''
          },
          amount: 20
        },
        {
          choices: {
            img_url: 'global/assets/stamps/reward-pre-stamp-1.png',
            text: ''
          },
          amount: 1
        }
      ]
    });
  }
}
