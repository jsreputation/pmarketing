import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearmeComponent } from './nearme.component';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import {
  RewardsService,
  IVoucherService,
  GeoLocationService,
  TokenStorage,
  UtilsModule,
  SettingsService
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
  getCategories: () => of(),
  getAllFavoriteRewards: () => of([]),
  favoriteReward: () => of(),
  unfavoriteReward: () => of(),
};

const vouchersServiceStub: Partial<IVoucherService> = {
  getRewardLocations: () => of(),
};

const tokenStorageStub = {
  getAppInfoProperty: () => null,
  setAppInfoProperty: () => { }
};

const settingsServiceStub: Partial<SettingsService> = {
  getRemoteFlagsSettings: () => of()
};

describe('NearmeComponent', () => {
  let component: NearmeComponent;
  let fixture: ComponentFixture<NearmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearmeComponent ],
      imports: [
        UtilsModule,
        MatIconModule
      ],
      providers: [
        { provide: TokenStorage, useValue: tokenStorageStub },
        { provide: GeoLocationService, useValue: geoLocationService },
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub },
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
