import { Observable, of } from 'rxjs';
import {
  IJsonApiItemPayload, IWPinataGameEngagementAttributes
} from '@perx/whistler';
import { IPinataForm } from '@cl-core/models/games/pinata/pinate-form.interface';

export class MockPinataService {
  public getPinataData(): Observable<IGameDefaultData> {
    return of({
      pinata: [    {
        id: 1,
        type: 'state1',
        title: 'icon',
        img: 'global/assets/game/mini_pinata_1.png',
        fullImg: 'global/assets/game/full_pinata_1.png',
        format: '.png',
        active: false
      }],
      background: [{
          id: 1,
          type: 'bg1',
          title: 'icon',
          img: 'global/assets/background/stamp-bg-7.png',
          fullImg: 'global/assets/background/full_bg_7.jpg',
          format: '.png',
          active: false
        }
      ]
    });
  }

  public getPinata(id: string): Observable<IPinataForm> {
    return of({
      id,
      type: 'data.type',
      gameType: 'data.attributes.game_type',
      name: 'data.attributes.title',
      headlineMessage: 'data.attributes.display_properties.title',
      subHeadlineMessage: 'data.attributes.display_properties.sub_title',
      buttonText: 'data.attributes.display_properties.button',
      background: 'data.attributes.display_properties.background_img_url',
      pinata: 'data.attributes.display_properties.closed_pinata_img_url',
      image_url: 'data.attributes.image_url'
      // opened_pinata_img_url: "data.attributes.display_properties.opened_pinata_img_url",
      // cracking_pinata_img_url: "data.attributes.display_properties.cracking_pinata_img_ur"l
    });
  }

  public createPinata(data: IPinataForm): Observable<IJsonApiItemPayload<IWPinataGameEngagementAttributes>> {
    const res: any = data;
    return of(res);
  }

  public updatePinata(id: string, data: IPinataForm): Observable<IJsonApiItemPayload<IWPinataGameEngagementAttributes>> {
    const res: any = {
      id,
      data
    };
    return of(res);
  }
}
