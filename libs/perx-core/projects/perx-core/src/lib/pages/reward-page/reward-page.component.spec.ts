import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardPageComponent } from './reward-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GameModule } from '../../game/game.module';
import { RewardsModule } from '../../rewards/rewards.module';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RewardsService } from '../../rewards/rewards.service';
import { InstantOutcomeService } from '../../outcome/instant-outcome.service';

describe('RewardPageComponent', () => {
  let component: RewardPageComponent;
  let fixture: ComponentFixture<RewardPageComponent>;

  const rewardsServiceStub = {
    getAllRewards: () => of(),
  };

  const instantOutStub = {

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardPageComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' }
        ]),
        GameModule,
        RewardsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: InstantOutcomeService, useValue: instantOutStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
