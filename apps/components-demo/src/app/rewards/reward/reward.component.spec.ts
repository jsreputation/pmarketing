import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RewardComponent } from './reward.component';
import {
  RewardsModule, RewardsService, IReward
} from '@perxtech/core';
import { MatButtonModule } from '@angular/material';
import { of } from 'rxjs';

describe('RewardComponent', () => {
  let component: RewardComponent;
  let fixture: ComponentFixture<RewardComponent>;
  const mockReward: IReward = {
    id: 1, name: '',
    description: '', subtitle: '', validFrom: null,
    validTo: null, rewardThumbnail: '', rewardBanner: '', merchantImg: '', termsAndConditions: '', howToRedeem: ''
  };
  const rewardsServiceStub: Partial<RewardsService> = {
    getReward: () => of(mockReward)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RewardsModule,
        MatButtonModule,
        TranslateModule.forRoot()
      ],
      declarations: [RewardComponent],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub }
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
