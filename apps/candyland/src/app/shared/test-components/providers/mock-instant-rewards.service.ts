import { Observable, of } from 'rxjs';
import {
  IJsonApiItemPayload, IWInstantOutcomeEngagementAttributes
} from '@perx/whistler';
import { IRewardDefaultValue } from '@cl-core/models/games/reward/reward-default-value.interface';
import { IRewardForm } from '@cl-core/models/games/reward/reward-form-interface';
import { InstantRewardsService } from '@cl-core-services';

export class MockInstantRewardsService implements Partial<InstantRewardsService> {
  public getInstantRewardData(): Observable<IRewardDefaultValue> {
    return of({
      background: [{
        id: 1,
        type: 'bg1',
        title: 'icon',
        img: 'global/assets/background/stamp-bg-1.png',
        fullImg: 'global/assets/background/full_bg_1.jpg',
        format: '.png',
        active: false
      }],
      cardBackground: [
        {
          id: 1,
          type: 'bg1',
          title: 'icon',
          img: 'global/assets/card-background/card-bg-1.png',
          fullImg: 'global/assets/card-background/card-bg-1.png',
          format: '.png',
          active: false
        }
      ]
    });
  }

  public getInstantReward(id: string): Observable<IRewardForm> {
    return of({
      name: `data.attributes.title${id}`,
      headlineMessage: 'data.attributes.display_properties.title',
      subHeadlineMessage: 'data.attributes.display_properties.sub_title',
      banner: 'data.attributes.display_properties.banner',
      buttonText: 'data.attributes.display_properties.button',
      background:
        'data.attributes.display_properties.background_img_url',
      cardBackground:
        'data.attributes.display_properties.card_background_img_url',
      image_url: 'data.attributes.image_url'
    });
  }

  public createRewardGame(data: IRewardForm): Observable<IJsonApiItemPayload<IWInstantOutcomeEngagementAttributes>> {
    return of((data as any));
  }

  public updateInstantReward(id: string, data: IRewardForm): Observable<IJsonApiItemPayload<IWInstantOutcomeEngagementAttributes>> {
    return of(({ id, data } as any));
  }
}
