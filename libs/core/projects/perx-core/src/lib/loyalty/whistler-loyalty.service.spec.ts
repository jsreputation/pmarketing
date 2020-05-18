import {
  TestBed,
  fakeAsync,
  inject,
  // tick
} from '@angular/core/testing';

import { WhistlerLoyaltyService } from './whistler-loyalty.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../config/config.module';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { IJsonApiItem, IWLoyalty, IWLoyaltyCard } from '@perxtech/whistler';
import { ILoyalty } from './models/loyalty.model';
import { skip } from 'rxjs/operators';

describe('WhistlerLoyaltyService', () => {
  const mockCard: IJsonApiItem<IWLoyaltyCard> = { id: '1', type: 'cards', attributes: { user_id: 1, balance: '42' } };
  const mockLoyalty: IJsonApiItem<IWLoyalty> = {
    id: '1',
    type: 'test',
    attributes: {
      name: 'test',
      unit: 'test',
      status: 'test',
      custom_tiers_count: 5
    }
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ],
    providers: [
    ]
  }));

  it('should be created', () => {
    const service: WhistlerLoyaltyService = TestBed.get(WhistlerLoyaltyService);
    expect(service).toBeTruthy();
  });

  // it('should getLoyalties', fakeAsync(inject([WhistlerLoyaltyService, HttpClient],
  //   (loyaltyService: WhistlerLoyaltyService, http: HttpClient) => {
  //     spyOn(http, 'get').mockReturnValue(of({
  //       data: [{
  //         attributes: {}
  //       }]
  //     }));
  //     loyaltyService.getLoyalties().subscribe(() => { });
  //     tick();
  //   })));

  it('test static WLoyaltyToLoyalty', () => {
    const val = WhistlerLoyaltyService.WLoyaltyToLoyalty(mockCard, [mockLoyalty]);
    expect(val).toBeTruthy();
    expect(val.id).toBe(1);
    expect(val.pointsBalance).toBe(42.0);
  });

  it('call getLoyalties when querrying getLoyalty without argument', fakeAsync(inject([WhistlerLoyaltyService, HttpClient],
    (loyaltyService: WhistlerLoyaltyService) => {
      jest.spyOn(loyaltyService, 'getLoyalties').mockReturnValue(of([{ id: 1 } as ILoyalty]));
      loyaltyService.getLoyalty().subscribe((loyalty) => expect(loyalty.id).toBe(1));
    })));

  it('call http when querrying getLoyalty with an argument', fakeAsync(inject([WhistlerLoyaltyService, HttpClient],
    (loyaltyService: WhistlerLoyaltyService, http: HttpClient) => {
      const spy = jest.spyOn(http, 'get').mockReturnValue(of({ data: mockCard }));
      loyaltyService.getLoyalty(1).subscribe((l: ILoyalty) => { expect(l.id).toBe(1); });
      expect(spy.mock.calls.length).toBe(1);
      loyaltyService.getLoyalty(1)
        // now that it is in cache, it should tick twice, once with the cache value, once with the http request based value
        .pipe(skip(1))
        .subscribe((l: ILoyalty) => { expect(l.id).toBe(1); });
    })));
});
