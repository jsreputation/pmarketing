import { Observable, of } from 'rxjs';
import {
  IJsonApiItemPayload, IWSpinGameEngagementAttributes
} from '@perx/whistler';

export class MockSpinSevice {

  public getMockData(): ISpinDefaultValue {
    return {
    name: 'test',
    headlineMessage: 'test',
    subHeadlineMessage: 'test',
    buttonText: 'test',
    image_url: 'test',
    numberOfWedges: [{
      value: 3,
      viewValue: '3 wedges'
    }],
    rewardSlots: [{
        value: 1,
        viewValue: '1'
      }
    ],
    colorCtrls: {1: 'test'},
    rewardIcon: {
      id: 1,
      type: 'post-stamp-2',
      title: 'icon',
      img: 'global/assets/stamps/post-stamp-2.png',
      fullImg: 'global/assets/stamps/post-stamp-2.png',
      format: '.png',
      active: false
    },
    wheelImg: {
      id: 1,
      type: 'wheelImgImage1',
      title: 'icon',
      img: 'global/assets/game/wheel1.png',
      fullImg: 'global/assets/game/wheel1full.png',
      format: '.png',
      active: false
    },
    wheelPosition: {
      id: 1,
      type: 'wheelPositionImage1',
      title: 'icon',
      img: 'global/assets/preview/positionup.png',
      fullImg: 'global/assets/preview/positionupfull.png',
      format: '.png',
      active: false
    },
    pointerImg: {
      id: 1,
      type: 'pointerImg1',
      title: 'icon',
      img: 'global/assets/game/pointer1.png',
      fullImg: 'global/assets/game/pointer1.png',
      format: '.png',
      active: false
    },
    background: {
      id: 1,
      type: 'bg1',
      title: 'icon',
      img: 'global/assets/background/stamp-bg-10.png',
      fullImg: 'global/assets/background/full_bg_10.jpg',
      format: '.png',
      active: false
    }
    };
  }

  public getISpinFormData(): Partial<ISpinEntityForm> {
    return {
      name: 'test',
      headlineMessage: 'test',
      subHeadlineMessage: 'test',
      buttonText: 'test',
      image_url: 'test',
      numberOfWedges: 3,
      rewardSlots: [4],
      colorCtrls: {1: 'test'},
      rewardIcon: 'test',
      background: 'test',
      pointerImg: 'test',
      wheelPosition: 'test',
      wheelImg: 'test',
    };
  }

  public getSpinData(): Observable<ISpinDefaultValue> {
    return of(this.getMockData());
  }

  public getSpin(id: string): Observable<Partial<ISpinEntityForm>> {
    console.log(id);
    return of(this.getISpinFormData());
  }

  public createSpin(data: ISpinEntityForm): Observable<IJsonApiItemPayload<IWSpinGameEngagementAttributes>> {
    console.log(data);
    return of(null);
  }

  public updateSpin(id: string, data: ISpinEntityForm): Observable<IJsonApiItemPayload<IWSpinGameEngagementAttributes>> {
    console.log(data, id);
    return of(null);
  }
}
