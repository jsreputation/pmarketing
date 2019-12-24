import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CampaignLaunchMessageComponent } from './campaign-launch-message.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('CampaignLaunchMessageComponent', () => {
  let component: CampaignLaunchMessageComponent;
  let fixture: ComponentFixture<CampaignLaunchMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignLaunchMessageComponent ],
      imports: [
        TranslateModule.forRoot()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignLaunchMessageComponent);
    component = fixture.componentInstance;
    component.index = 1;
    component.group = new FormGroup({
      sentType: new FormControl(null),
      sentDay: new FormControl(null),
      sentTime: new FormControl(null),
      template: new FormGroup({
        message: new FormControl(null, [Validators.required]),
        templateId: new FormControl(null),
      }),
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
