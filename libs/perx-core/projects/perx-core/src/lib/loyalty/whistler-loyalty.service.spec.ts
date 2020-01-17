import {
  TestBed,
  fakeAsync,
  inject,
  // tick
} from '@angular/core/testing';

import { WhistlerLoyaltyService } from './whistler-loyalty.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../config/config.module';
import { AuthenticationService } from '../auth/authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { IJsonApiItem, IWLoyalty, IWLoyaltyCard } from '@perx/whistler';
import { ILoyalty } from './models/loyalty.model';

describe('WhistlerLoyaltyService', () => {
  const authServiceStub: Partial<AuthenticationService> = {
    getUserId: () => 0
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ],
    providers: [
      { provide: AuthenticationService, useValue: authServiceStub }
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
    const val = WhistlerLoyaltyService.WLoyaltyToLoyalty({
      id: '1',
      type: 'test',
      attributes: {
        user_id: 1,
        name: 'test',
        unit: 'test',
        status: 'test',
        custom_tiers_count: 5
      },
      relationships: {
        cards: {
          data: [{
            type: 'cards',
            id: '1'
          }]
        }
      }
    } as IJsonApiItem<IWLoyalty>, 1, [{ id: '1', type: 'cards', attributes: { user_id: 1 } } as IJsonApiItem<IWLoyaltyCard>]);
    expect(val).toBeTruthy();
  });

  it('', fakeAsync(inject([WhistlerLoyaltyService, HttpClient],
    (loyaltyService: WhistlerLoyaltyService, http: HttpClient) => {
      spyOn(http, 'get').and.returnValue(of({
        data: {
          attributes: {}
        }
      }));
      spyOn(loyaltyService, 'getLoyalties').and.returnValue(of([{ id: 1 } as ILoyalty]));
      loyaltyService.getLoyalty(1).subscribe(() => { });
      loyaltyService.getLoyalty().subscribe((loyalty) => expect(loyalty.id).toBe(1));
    })));
});
