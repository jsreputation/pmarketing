import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RewardInfoFormGroupComponent} from './reward-info-form-group.component';

describe('RewardInfoFormGroupComponent', () => {
  let component: RewardInfoFormGroupComponent;
  let fixture: ComponentFixture<RewardInfoFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardInfoFormGroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardInfoFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
