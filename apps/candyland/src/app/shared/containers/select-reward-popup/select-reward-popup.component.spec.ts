import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRewardPopupComponent } from './select-reward-popup.component';

describe('SelectRewardPopupComponent', () => {
  let component: SelectRewardPopupComponent;
  let fixture: ComponentFixture<SelectRewardPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRewardPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRewardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
