import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CampaignLaunchMessageComponent } from './campaign-launch-message.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('CampaignLaunchMessageComponent', () => {
  let component: CampaignLaunchMessageComponent;
  let fixture: ComponentFixture<CampaignLaunchMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignLaunchMessageComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignLaunchMessageComponent);
    component = fixture.componentInstance;
    component.index = 1;
    component.group = new FormGroup({
      sentType: new FormControl(null, [Validators.required]),
      sentDay: new FormControl(null, [Validators.required]),
      sentTime: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
      birthdayTime: new FormControl(null),
      monthDay: new FormControl(null, [Validators.min(1), Validators.max(31)]),
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
