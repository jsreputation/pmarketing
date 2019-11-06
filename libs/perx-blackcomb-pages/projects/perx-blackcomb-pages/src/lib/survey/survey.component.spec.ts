import { SurveyModule as PerxSurveyModule, ConfigModule, ICampaignService, SurveyService } from '@perx/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyComponent } from './survey.component';
import { MatCardModule, MatButtonModule, MatProgressBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('SurveyComponent', () => {
  let component: SurveyComponent;
  let fixture: ComponentFixture<SurveyComponent>;
  const iCampaignServiceStub: Partial<ICampaignService> = {};
  const surveyServiceStub: Partial<SurveyService> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyComponent],
      imports: [
        ConfigModule.forRoot({}),
        MatCardModule,
        MatButtonModule,
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' }
        ]),
        MatProgressBarModule,
        PerxSurveyModule,
        TranslateModule.forRoot()
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
    fixture = TestBed.createComponent(SurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
