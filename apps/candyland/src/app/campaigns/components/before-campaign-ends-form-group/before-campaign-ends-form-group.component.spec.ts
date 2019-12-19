import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BeforeCampaignEndsFormGroupComponent } from './before-campaign-ends-form-group.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('BeforeCampaignEndsFormGroupComponent', () => {
  let component: BeforeCampaignEndsFormGroupComponent;
  let fixture: ComponentFixture<BeforeCampaignEndsFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforeCampaignEndsFormGroupComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeCampaignEndsFormGroupComponent);
    component = fixture.componentInstance;
    component.index = 1;
    component.group = new FormGroup({
      numberPeriod: new FormControl(null, [Validators.required, Validators.min(1)]),
      type: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
    });
    component.shortCodes = [
      {title: 'Campaign Url', value: '[campaignUrl]'},
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
