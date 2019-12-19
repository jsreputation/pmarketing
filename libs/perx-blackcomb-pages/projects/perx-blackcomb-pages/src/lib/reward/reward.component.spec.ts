import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import {
  GameModule,
  RewardsModule,
  RewardsService,
  InstantOutcomeService,
  AuthenticationService,
  NotificationService,
  ThemesService
} from '@perx/core';

import { RewardComponent } from './reward.component';

describe('RewardComponent', () => {
  let component: RewardComponent;
  let fixture: ComponentFixture<RewardComponent>;

  const themesServiceStub = {
    getThemeSetting: () => of()
  };

  const rewardsServiceStub: Partial<RewardsService> = {
    getAllRewards: () => of(),
  };

  const instantOutStub: Partial<InstantOutcomeService> = {
    getFromCampaign: () => of(),
    prePlayConfirm: () => of(),
    prePlay: () => of()
  };

  const authServiceStub: Partial<AuthenticationService> = {
    getAnonymous: () => true,
  };

  const notificationServiceStub: Partial<NotificationService> = {
    addPopup: () => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' },
          { path: 'pi', redirectTo: '/' },
        ]),
        GameModule,
        RewardsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: RewardsService,
          useValue: rewardsServiceStub,
        },
        {
          provide: InstantOutcomeService,
          useValue: instantOutStub,
        },
        {
          provide: AuthenticationService,
          useValue: authServiceStub,
        },
        {
          provide: NotificationService,
          useValue: notificationServiceStub,
        },
        {
          provide: ThemesService,
          useValue: themesServiceStub,
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
