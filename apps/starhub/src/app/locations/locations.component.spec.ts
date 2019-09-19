import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsComponent } from './locations.component';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilsModule, LocationsService, GeoLocationService, RewardsService, import { UtilsModule, RewardsService, IMerchantsService } from '@perx/core';
} from '@perx/core';
import { ActivatedRoute, Params } from '@angular/router';
import { of, Subject } from 'rxjs';
import { Location } from '@angular/common';
import { Type } from '@angular/core';
import { AnalyticsService } from '../analytics.service';

describe('LocationsComponent', () => {
  let component: LocationsComponent;
  let fixture: ComponentFixture<LocationsComponent>;
  const rewardsServiceStub = {};
  const merchantsServiceStub = {
    getMerchant: () => of()
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
  const locationsServiceStub = {
    getFromMerchant: () => of(location)
  };
  const geoLocationServiceStub = {
    positions: () => of(position)
  };
  const locationStub = {
    back: () => {}
  };
  let params: Subject<Params>;
  const rewardsServiceStub = {
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

  const analyticsServiceStub = {
    addEvent: () => {}
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
        }
        {
          provide: ActivatedRoute, useValue: { queryParams: params }
        },
        { provide: LocationsService, useValue: locationsServiceStub },
        { provide: GeoLocationService, useValue: geoLocationServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: AnalyticsService, useValue: analyticsServiceStub }
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
      params.next({mid: null});
      component.ngOnInit();
      expect(component.locations).toBe(undefined);
    });

    it('should set locations based on the mid queryParams', () => {
      params.next({mid: 1});
      params.next({rid: 2});
      component.ngOnInit();
      component.locations.subscribe(res => {
        expect(res[0].merchantId).toBe(1);
        expect(res[0].merchantName).toBe('abc');
        expect(res[0].locationId).toBe(1);
        expect(res[0].name).toBe('abc');
        expect(res[0].latitude).toBe(1);
        expect(res[0].longitude).toBe(2);
      });
    });
  });

  it('should navigate back', () => {
    const locationFixture: Location = fixture.debugElement.injector.get<Location>(Location as Type<Location>);
    const locationSpy = spyOn(locationFixture, 'back').and.callThrough();
    component.back();
    expect(locationSpy).toHaveBeenCalled();
  });

});
