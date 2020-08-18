import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearmeComponent } from './nearme.component';
import { of } from 'rxjs';
import {
  RewardsService,
  IVoucherService,
  GeoLocationService
} from '@perxtech/core';

const coords: Position = {
  timestamp: 113,
  coords: {
    latitude: 20,
    longitude: 30,
    altitude: 450,
    speed: 30,
    accuracy: 41,
    altitudeAccuracy: 5559,
    heading: 123
  }
};

const geoLocationService: Partial<GeoLocationService> = {
  positions: () => of(coords)
};

const rewardsServiceStub: Partial<RewardsService> = {
  nearMe: () => of(),
};

const vouchersServiceStub: Partial<IVoucherService> = {
  getRewardLocations: () => of()
};

describe('NearmeComponent', () => {
  let component: NearmeComponent;
  let fixture: ComponentFixture<NearmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearmeComponent ],
      providers: [
        { provide: GeoLocationService, useValue: geoLocationService },
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: IVoucherService, useValue: vouchersServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
