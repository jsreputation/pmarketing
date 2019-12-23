import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CampaignNotCompletedFormGroupComponent } from './campaign-not-completed-form-group.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('CampaignNotCompletedFormGroupComponent', () => {
  let component: CampaignNotCompletedFormGroupComponent;
  let fixture: ComponentFixture<CampaignNotCompletedFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignNotCompletedFormGroupComponent ],
      imports: [
        TranslateModule.forRoot()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignNotCompletedFormGroupComponent);
    component = fixture.componentInstance;
    component.index = 1;
    component.shortCodes = [
      {title: 'Campaign Url', value: '[campaignUrl]'},
    ];
    component.group = new FormGroup({
      numberPeriod: new FormControl(null, [Validators.required, Validators.min(1)]),
      type: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      template: new FormGroup({
        message: new FormControl(null, [Validators.required]),
        templateId: new FormControl(null),
      }),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});