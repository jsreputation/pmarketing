import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EarnedStampFormGroupComponent } from './earned-stamp-form-group.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('EarnedStampFormGroupComponent', () => {
  let component: EarnedStampFormGroupComponent;
  let fixture: ComponentFixture<EarnedStampFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarnedStampFormGroupComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnedStampFormGroupComponent);
    component = fixture.componentInstance;
    component.index = 1;
    component.shortCodes = [
      {title: 'Campaign Url', value: '[campaignUrl]'},
    ];
    component.group = new FormGroup({
      stamp: new FormControl(null, [Validators.required, Validators.min(1)]),
      message: new FormControl(null, [Validators.required]),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
