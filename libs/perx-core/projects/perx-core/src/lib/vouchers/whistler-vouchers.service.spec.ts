import { TestBed } from '@angular/core/testing';

import { WhistlerVouchersService } from './whistler-vouchers.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigModule, RewardsService } from '../../public-api';
import { of } from 'rxjs';
import { IReward } from '../rewards/models/reward.model';
import { IJsonApiItem, IJsonApiItemPayload, IJsonApiListPayload } from '../jsonapi.payload';
import { IAssignedAttributes, AssignedStatus } from '@perx/whistler';
import { IVoucher } from './models/voucher.model';
import { Type } from '@angular/core';

fdescribe('WhistlerVouchersService', () => {
  let httpTestingController: HttpTestingController;
  let service: WhistlerVouchersService;
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
    attributes: {
      assigned_to_id: 42,
      value: '42',
      created_at: '42',
      valid_to: '42',
      source_id: 42,
      source_type: '42',
      valid_from: '42',
      status: AssignedStatus.issued,
      updated_at: '42',
      urn: '42',
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ConfigModule.forRoot({ ...environment })
      ],
      providers: [
        {
          provide: RewardsService, useValue: rewardsServiceStub
        }
      ]
    });
    httpTestingController = TestBed.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    service = TestBed.get(WhistlerVouchersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a voucher from its number', (done: DoneFn) => {
    service.get(42)
      .subscribe((v: IVoucher) => {
        expect(`${v.id}`).toEqual(mockVoucherApi.id);
        done();
      });

    const req = httpTestingController.expectOne('https://blabla/voucher-service/vouchers/42');
    expect(req.request.method).toEqual('GET');
    const res: IJsonApiItemPayload<IAssignedAttributes> = {
      data: mockVoucherApi
    };
    req.flush(res);

    httpTestingController.verify();
  });

  it('should get all vouchers', (done: DoneFn) => {
    service.getAll()
      .subscribe((vs: IVoucher[]) => {
        expect(vs.length).toEqual(1);
        done();
      });

    const req = httpTestingController.expectOne('https://blabla/voucher-service/vouchers');
    expect(req.request.method).toEqual('GET');
    const res: IJsonApiListPayload<IAssignedAttributes> = {
      data: [mockVoucherApi]
    };
    req.flush(res);

    httpTestingController.verify();
  });
});
