import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RewardDetailPageComponent } from './reward-detail-page.component';
import { RewardsModule } from '../../rewards/rewards.module';
import { RewardsService } from '../../rewards/rewards.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('RewardDetailPageComponent', () => {
  let component: RewardDetailPageComponent;
  let fixture: ComponentFixture<RewardDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardDetailPageComponent],
      imports: [
        RewardsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: RewardsService, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
