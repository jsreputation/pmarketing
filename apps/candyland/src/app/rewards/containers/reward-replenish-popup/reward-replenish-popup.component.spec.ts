import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RewardReplenishPopupComponent} from 'src/app/rewards/containers/reward-replenish-popup/reward-replenish-popup.component';

describe('RewardReplenishPopupComponent', () => {
  let component: RewardReplenishPopupComponent;
  let fixture: ComponentFixture<RewardReplenishPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardReplenishPopupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardReplenishPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
