import { TestBed } from '@angular/core/testing';

import { WhistlerVouchersService } from './whistler-vouchers.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule, RewardsService } from '../../public-api';
import { of } from 'rxjs';
import { IReward } from '../rewards/models/reward.model';
import { IJsonApiItem } from '../jsonapi.payload';
import { IAssignedAttributes } from '@perx/whistler';

fdescribe('WhistlerVouchersService', () => {

  const environment = {
    apiHost: 'https://blabla',
    production: false,
    isWhistler: true,
    preAuth: false,
    baseHref: '/'
  };

  const mockReward: IReward = {
    id: 1,
    name: 'string;',
    description: 'string;',
    subtitle: 'string;',
    validFrom: new Date(),
    validTo: new Date(),
    rewardBanner: 'string;',
    merchantImg: 'string;',
    termsAndConditions: 'string;',
    howToRedeem: 'string;',
  };
  const rewardsServiceStub = {
    getReward: () => of(mockReward)
  };

  const mockVoucherApi: IJsonApiItem<IAssignedAttributes> = {
    id: '12',
    type: '',
    links: {
      self: ''
    },
    attributes: {}
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({ ...environment })
    ],
    providers: [
      {
        provide: RewardsService, useValue: rewardsServiceStub
      }
    ]
  }));

  it('should be created', () => {
    const service: WhistlerVouchersService = TestBed.get(WhistlerVouchersService);
    expect(service).toBeTruthy();
  });
});
