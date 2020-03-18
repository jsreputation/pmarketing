import { Observable, of } from 'rxjs';
import {
  IJsonApiItemPayload, IWScratchGameEngagementAttributes
} from '@perxtech/whistler';
import { IGameDefaultData } from '@cl-core/models/games/game-default-data.interface';
import { IScratchForm } from '@cl-core/models/games/scratch/scratch-form.interface';
import { ScratchService } from '@cl-core-services';

export class MockScratchService implements Partial<ScratchService> {

  private getMockData(): IGameDefaultData {
    return {
      background: [{
        id: 1,
        type: 'bg1',
        title: 'icon',
        img: 'tenants/666666666/d7r6n7iildb5nv3devvdd2mkzl4p',
        fullImg: 'tenants/666666666/d7r6n7iildb5nv3devvdd2mkzl4p',
        format: '.png',
        active: false
      }],
      preScratchImage: [{
        id: 1,
        type: 'preScratchImage1',
        title: 'icon',
        img: 'tenants/666666666/908d0vnvjsa45yw4dt4v0i07v4zt',
        fullImg: 'tenants/666666666/908d0vnvjsa45yw4dt4v0i07v4zt',
        format: '.png',
        active: false
      }],
      postScratchSuccessImage: [{
        id: 1,
        type: 'postScratchSuccessImage1',
        title: 'icon',
        img: 'tenants/666666666/oxblxqrrq8nza995e8puc14kx690',
        fullImg: 'tenants/666666666/oxblxqrrq8nza995e8puc14kx690',
        format: '.png',
        active: false
      }],
      postScratchFailImage: [
        {
          id: 1,
          type: 'postScratchFailImage1',
          title: 'icon',
          img: 'tenants/666666666/zwpwr5xbfeojk9kxakjd5lmzdxr7',
          fullImg: 'tenants/666666666/zwpwr5xbfeojk9kxakjd5lmzdxr7',
          format: '.png',
          active: false
        }
      ],

    };
  }

  public getScratchData(): Observable<IGameDefaultData> {
    return of(this.getMockData());
  }

  public getScratch(id: string): Observable<IScratchForm> {
    return of({
      id: id ? id : '1',
      name: 'Scratch the Card Template',
      headlineMessage: 'Scratch it!',
      subHeadlineMessage: 'Scratch it to get a reward!',
      buttonText: 'Start Playing',
      image_url: null,
      gameType: 'string;',
      preScratchImage: 'assets/images/background/background1.png;',
      postScratchSuccessImage: 'assets/images/background/background1.png;',
      postScratchFailImage: 'assets/images/background/background1.png;',
      background: 'assets/images/background/background1.png;',
    });
  }

  public createScratch(): Observable<IJsonApiItemPayload<IWScratchGameEngagementAttributes>> {
    return of(null);
  }

  public updateScratch(): Observable<IJsonApiItemPayload<IWScratchGameEngagementAttributes>> {
    return of(null);
  }
}
