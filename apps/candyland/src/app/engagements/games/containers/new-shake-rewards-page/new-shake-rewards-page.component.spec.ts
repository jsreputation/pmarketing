import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShakeRewardsPageComponent } from './new-shake-rewards-page.component';

describe('NewShakeRewardsPageComponent', () => {
  let component: NewShakeRewardsPageComponent;
  let fixture: ComponentFixture<NewShakeRewardsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewShakeRewardsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewShakeRewardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
