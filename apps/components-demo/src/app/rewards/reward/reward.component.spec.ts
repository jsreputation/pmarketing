import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardComponent } from './reward.component';
import { AuthenticationService, RewardsModule, RewardsService } from '@perx/core';
import { MatButtonModule } from '@angular/material';

describe('RewardComponent', () => {
  let component: RewardComponent;
  let fixture: ComponentFixture<RewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RewardsModule,
        MatButtonModule
      ],
      declarations: [RewardComponent],
      providers: [{
        provide: RewardsService,
        useValue: {getReward: () => {}}
      }]
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
