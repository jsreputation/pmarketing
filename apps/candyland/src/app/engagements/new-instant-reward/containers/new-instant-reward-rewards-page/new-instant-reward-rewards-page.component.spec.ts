import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInstantRewardRewardsPageComponent } from './new-instant-reward-rewards-page.component';

describe('NewInstantRewardRewardsPageComponent', () => {
  let component: NewInstantRewardRewardsPageComponent;
  let fixture: ComponentFixture<NewInstantRewardRewardsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInstantRewardRewardsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInstantRewardRewardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
