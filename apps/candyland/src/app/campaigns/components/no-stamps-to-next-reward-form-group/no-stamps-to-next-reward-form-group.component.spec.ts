import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoStampsToNextRewardFormGroupComponent } from './no-stamps-to-next-reward-form-group.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('NoStampsToNextRewardFormGroupComponent', () => {
  let component: NoStampsToNextRewardFormGroupComponent;
  let fixture: ComponentFixture<NoStampsToNextRewardFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoStampsToNextRewardFormGroupComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoStampsToNextRewardFormGroupComponent);
    component = fixture.componentInstance;
    component.index = 1;
    component.group = new FormGroup({
      stamp: new FormControl(null, [Validators.required, Validators.min(1)]),
      slot: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
    });
    component.shortCodes = [
      {title: 'Campaign Url', value: '[campaignUrl]'},
      {title: 'User ID', value: '[userId]'},
      {title: 'First name', value: '[userFirstName]'},
      {title: 'Last name', value: '[userLastName]'},
      {title: 'Salutation', value: '[salutation]'}
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
