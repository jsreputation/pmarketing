import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleSetupPopupComponent } from './rule-setup-popup.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RuleSetupPopupComponent', () => {
  let component: RuleSetupPopupComponent;
  let fixture: ComponentFixture<RuleSetupPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleSetupPopupComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleSetupPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
