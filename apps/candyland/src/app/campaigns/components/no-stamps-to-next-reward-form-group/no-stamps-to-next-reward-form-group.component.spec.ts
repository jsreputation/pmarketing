import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoStampsToNextRewardFormGroupComponent } from './no-stamps-to-next-reward-form-group.component';

describe('NoStampsToNextRewardFormGroupComponent', () => {
  let component: NoStampsToNextRewardFormGroupComponent;
  let fixture: ComponentFixture<NoStampsToNextRewardFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoStampsToNextRewardFormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoStampsToNextRewardFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
