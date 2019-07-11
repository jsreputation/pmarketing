import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantRewardComponent } from './instant-reward.component';

describe('InstantRewardComponent', () => {
  let component: InstantRewardComponent;
  let fixture: ComponentFixture<InstantRewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstantRewardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
