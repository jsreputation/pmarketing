import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RewardInfoPreviewComponent} from 'src/app/rewards/components/reward-info-preview/reward-info-preview.component';

describe('RewardLimitsPreviewComponent', () => {
  let component: RewardInfoPreviewComponent;
  let fixture: ComponentFixture<RewardInfoPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardInfoPreviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardInfoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
