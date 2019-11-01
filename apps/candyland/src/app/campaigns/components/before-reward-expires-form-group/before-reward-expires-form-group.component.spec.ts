import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeRewardExpiresFormGroupComponent } from './before-reward-expires-form-group.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('BeforeRewardExpiresFormGroupComponent', () => {
  let component: BeforeRewardExpiresFormGroupComponent;
  let fixture: ComponentFixture<BeforeRewardExpiresFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforeRewardExpiresFormGroupComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeRewardExpiresFormGroupComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({
      numberPeriod: new FormControl(null, [Validators.required, Validators.min(1)]),
      type: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      message: new FormControl()
    });
    component.index = 1;
    component.shortCodes = [
      {title: 'Campaign Url', value: '[campaignUrl]'},
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
