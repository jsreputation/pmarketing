import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EarnedRewardFormGroupComponent } from './earned-reward-form-group.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('EarnedRewardFormGroupComponent', () => {
  let component: EarnedRewardFormGroupComponent;
  let fixture: ComponentFixture<EarnedRewardFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarnedRewardFormGroupComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnedRewardFormGroupComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({
      slot: new FormControl(null, [Validators.required, Validators.min(1)]),
      message: new FormControl(null, [Validators.required]),
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
