import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsListTabbedComponent } from './rewards-list-tabbed.component';
import { RewardsModule as PerxRewardsModule, RewardsService } from '@perx/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RewardsListTabbedComponent', () => {
  let component: RewardsListTabbedComponent;
  let fixture: ComponentFixture<RewardsListTabbedComponent>;

  const rewardsServiceStub = {
    getAllRewards: () => ({ subscribe: () => ({}) }),
    getReward: () => ({ subscribe: () => ({}) })
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
