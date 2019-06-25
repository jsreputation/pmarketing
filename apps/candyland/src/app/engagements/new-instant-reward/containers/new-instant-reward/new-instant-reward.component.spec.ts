import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInstantRewardComponent } from './new-instant-reward.component';

describe('NewInstantRewardComponent', () => {
  let component: NewInstantRewardComponent;
  let fixture: ComponentFixture<NewInstantRewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInstantRewardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInstantRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
