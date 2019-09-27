import { InstantOutcomeService } from './../../../../../../backend/api-proxy/src/services/instant-outcome/instant-outcome.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RewardComponent } from './reward.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GameModule, RewardsModule, RewardsService } from '@perx/core';
import { of } from 'rxjs';

describe('RewardComponent', () => {
  let component: RewardComponent;
  let fixture: ComponentFixture<RewardComponent>;

  const rewardsServiceStub = {
    getAllRewards: () => of(),
  };

  const instantOutStub = {

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardComponent],
      imports: [
        RouterTestingModule,
        GameModule,
        RewardsModule,
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: InstantOutcomeService, useValue: instantOutStub }
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
