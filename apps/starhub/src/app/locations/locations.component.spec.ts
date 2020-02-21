import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { LocationsComponent } from './locations.component';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Voucher as IVoucher, UtilsModule, LocationsService, GeoLocationService, RewardsService, IMerchantsService, IVoucherService } from '@perx/core';
import { ActivatedRoute, Params } from '@angular/router';
import { of, Subject } from 'rxjs';
import { Location } from '@angular/common';
import { Type } from '@angular/core';
import { AnalyticsService } from '../analytics.service';
import { vouchers } from '../vouchers.mock';
import { rewards } from '../rewards.mock';

const vouchersServiceStub: Partial<IVoucherService> = {
  get: () => of(vouchers[0])
};

describe('LocationsComponent', () => {
  let component: LocationsComponent;
  let fixture: ComponentFixture<LocationsComponent>;
  const merchantsServiceStub: Partial<IMerchantsService> = {
    getMerchant: () => of()
  };

  const position = {
    coords: {
      accuracy: 0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: 0,
      longitude: 0,
      speed: null
    },
    timestamp: Date.now()
  };
  const location = [
    {
      merchantId: 1,
      merchantName: 'abc',
      locationId: 1,
      name: 'abc',
      tags: [],
      address: '',
      address2: '',
      address3: '',
      latitude: 1,
      longitude: 2,
      phone: '',
      distance: 1,
    }
  ];
  const locationsServiceStub: Partial<LocationsService> = {
    getFromMerchant: () => of(location)
  };
  const geoLocationServiceStub: Partial<GeoLocationService> = {
    positions: () => of(position)
  };
  const locationStub: Partial<Location> = {
    back: () => { }
  };
  let params: Subject<Params>;
  const rewardsServiceStub: Partial<RewardsService> = {
    getReward: () => of({
      id: 1,
      name: 'Reward Test',
      description: 'Reward Description',
      subtitle: '',
      validFrom: new Date(),
      validTo: new Date(),
      sellingFrom: new Date(),
      rewardThumbnail: '',
      rewardBanner: '',
      merchantImg: '',
      rewardPrice: [],
      merchantId: 1,
      merchantName: '',
      merchantWebsite: '',
      termsAndConditions: '',
      howToRedeem: '',
      categoryTags: [{
        id: 1,
        title: 'tag',
        parent: '',
      }],
      inventory: null,
    })
  };

  const analyticsServiceStub: Partial<AnalyticsService> = {
    addEvent: () => { }
  };

  beforeEach(async(() => {
    params = new Subject<Params>();

    TestBed.configureTestingModule({
      declarations: [LocationsComponent],
      imports: [
        MatIconModule,
        MatToolbarModule,
        RouterTestingModule,
        UtilsModule
      ],
      providers: [
        {
          provide: IMerchantsService, useValue: merchantsServiceStub
        },
        {
          provide: ActivatedRoute, useValue: { queryParams: params }
        },
        { provide: LocationsService, useValue: locationsServiceStub },
        { provide: GeoLocationService, useValue: geoLocationServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: AnalyticsService, useValue: analyticsServiceStub },
        { provide: IVoucherService, useValue: vouchersServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should location be undefined if mid is not present in the queryParams', () => {
      const defVal = component.locations$;
      params.next({ mid: null });
      component.ngOnInit();
      expect(component.locations$).toBe(defVal);
    });

    it('should set locations based on the mid queryParams', fakeAsync(inject([IVoucherService], (vouchersService: IVoucherService) => {
      spyOn(vouchersService, 'get').and.returnValue(of({ reward: rewards[0] } as IVoucher));
      params.next({ merchantId: 1 });
      params.next({ voucherId: 2 });
      component.ngOnInit();
      tick();
      component.locations$.subscribe(res => {
        expect(res[0].merchantId).toBe(1);
        expect(res[0].merchantName).toBe('abc');
        expect(res[0].locationId).toBe(1);
        expect(res[0].name).toBe('abc');
        expect(res[0].latitude).toBe(1);
        expect(res[0].longitude).toBe(2);
      });
    })));
  });

  it('should navigate back', () => {
    const locationFixture: Location = fixture.debugElement.injector.get<Location>(Location as Type<Location>);
    const locationSpy = spyOn(locationFixture, 'back').and.callThrough();
    component.back();
    expect(locationSpy).toHaveBeenCalled();
  });

});
