import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RewardsListTabbedComponent } from './rewards-list-tabbed.component';
import { RewardsModule as PerxRewardsModule, RewardsService, SettingsService } from '@perxtech/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('RewardsListTabbedComponent', () => {
  let component: RewardsListTabbedComponent;
  let fixture: ComponentFixture<RewardsListTabbedComponent>;

  const rewardsServiceStub: Partial<RewardsService> = {
    getAllRewards: () => (of([])),
    getReward: () => (of({
      id: 1,
      name: '',
      description: 'Lorem ipsum',
      subtitle: 'string',
      validFrom: new Date('2018-12-16T03:24:00'),
      validTo: new Date('2019-11-17T03:24:00'),
      rewardBanner: '',
      termsAndConditions: '',
      loyalty: []
    }))
  };
  const settingsServiceStub: Partial<SettingsService> = {
    getRemoteFlagsSettings: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PerxRewardsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot()
      ],
      declarations: [RewardsListTabbedComponent],
      providers: [
        {
          provide: RewardsService,
          useValue: rewardsServiceStub
        },
        { provide: SettingsService, useValue: settingsServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsListTabbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
