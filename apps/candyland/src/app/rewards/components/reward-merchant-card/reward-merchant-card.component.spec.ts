import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RewardMerchantCardComponent} from 'src/app/rewards/components/reward-merchant-card/reward-merchant-card.component';

describe('RewardMerchantItemComponent', () => {
  let component: RewardMerchantCardComponent;
  let fixture: ComponentFixture<RewardMerchantCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardMerchantCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardMerchantCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
