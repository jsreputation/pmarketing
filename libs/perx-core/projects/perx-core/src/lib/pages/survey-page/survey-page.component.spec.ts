import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPageComponent } from './survey-page.component';
import { SurveyService } from '../../survey/survey.service';
import { ConfigModule } from '../../config/config.module';
import { MatCardModule, MatButtonModule, MatProgressBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { SurveyModule } from '../../survey/survey.module';
import { ICampaignService } from '../../campaign/icampaign.service';

describe('SurveyPageComponent', () => {
  let component: SurveyPageComponent;
  let fixture: ComponentFixture<SurveyPageComponent>;
  const iCampaignServiceStub = {};
  const surveyServiceStub: Partial<SurveyService> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPageComponent ],
      imports: [
        ConfigModule.forRoot({}),
        MatCardModule,
        MatButtonModule,
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' }
        ]),
        MatProgressBarModule,
        SurveyModule
      ],
      providers: [
        {
          provide: ICampaignService,
          useValue: iCampaignServiceStub
        },
        {
          provide: SurveyService, useValue: surveyServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
