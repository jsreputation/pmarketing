import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RewardComponent } from './reward.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GameModule, RewardsModule, RewardsService, InstantOutcomeService } from '@perx/core';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

describe('RewardComponent', () => {
  let component: RewardComponent;
  let fixture: ComponentFixture<RewardComponent>;

  const rewardsServiceStub: Partial<RewardsService> = {
    getAllRewards: () => of(),
  };

  const instantOutStub: Partial<InstantOutcomeService> = {

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' }
        ]),
        GameModule,
        RewardsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
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
