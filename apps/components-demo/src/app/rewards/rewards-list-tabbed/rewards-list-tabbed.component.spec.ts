import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsListTabbedComponent } from './rewards-list-tabbed.component';
import { RewardsModule as PerxRewardsModule, RewardsService } from '@perx/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {of} from 'rxjs';

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
      termsAndConditions: ''}))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PerxRewardsModule,
        NoopAnimationsModule
      ],
      declarations: [RewardsListTabbedComponent],
      providers: [
        {
          provide: RewardsService,
          useValue: rewardsServiceStub
        }
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
