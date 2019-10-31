import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnedRewardFormGroupComponent } from './earned-reward-form-group.component';

describe('EarnedRewardFormGroupComponent', () => {
  let component: EarnedRewardFormGroupComponent;
  let fixture: ComponentFixture<EarnedRewardFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarnedRewardFormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnedRewardFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
