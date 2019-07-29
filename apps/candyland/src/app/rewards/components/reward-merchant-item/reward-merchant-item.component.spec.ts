import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RewardMerchantItemComponent} from 'src/app/rewards/components/reward-merchant-item/reward-merchant-item.component';

describe('RewardMerchantItemComponent', () => {
  let component: RewardMerchantItemComponent;
  let fixture: ComponentFixture<RewardMerchantItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardMerchantItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardMerchantItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
