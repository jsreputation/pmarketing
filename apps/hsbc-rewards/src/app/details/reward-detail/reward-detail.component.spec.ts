import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardDetailComponent } from './reward-detail.component';
import { IReward, RewardsModule, RewardsService, SettingsService, ThemesService, TokenStorage } from '@perxtech/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-detail-header',
  template: ''
})
class MockDetailHeaderComponent { }

describe('RewardDetailComponent', () => {
  let component: RewardDetailComponent;
  let fixture: ComponentFixture<RewardDetailComponent>;
  const mockReward: IReward = {
    id: 1,
    name: '',
    description: '',
    subtitle: '',
    validFrom: new Date(),
    validTo: new Date(),
    rewardBanner: '',
    merchantImg: '',
    termsAndConditions: '',
    howToRedeem: '',
    loyalty: []
  };
  const rewardsServiceStub: Partial<RewardsService> = {
    getReward: () => of(mockReward)
  };
  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };
  const tokenStorageStub = {
    getAppInfoProperty: () => null,
    setAppInfoProperty: () => { }
  };
  const settingsServiceStub: Partial<SettingsService> = {
    getRemoteFlagsSettings: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardDetailComponent, MockDetailHeaderComponent],
      imports: [
        RewardsModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: ThemesService, useValue: themesServiceStub },
        { provide: TokenStorage, useValue: tokenStorageStub },
        { provide: SettingsService, useValue: settingsServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
