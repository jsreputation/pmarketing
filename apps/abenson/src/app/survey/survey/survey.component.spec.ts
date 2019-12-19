import { SurveyModule as PerxSurveyModule, ICampaignService, ISurvey, SurveyService } from '@perx/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyComponent } from './survey.component';
import { MatCardModule, MatButtonModule, MatProgressBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('SurveyComponent', () => {
  let component: SurveyComponent;
  let fixture: ComponentFixture<SurveyComponent>;
  const mockSurvey: ISurvey = {
    title: '',
    questions: []
  };
  const surveyServiceStub: Partial<SurveyService> = {};

  const iCampaignServiceStub: Partial<SurveyService> = {
    getSurveyFromCampaign: () => of(mockSurvey)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyComponent ],
      imports: [
        MatCardModule,
        MatButtonModule,
        RouterTestingModule,
        MatProgressBarModule,
        PerxSurveyModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ICampaignService,
          useValue: iCampaignServiceStub
        },
        {
          provide: SurveyService, useValue: surveyServiceStub
        }
      ],
      schemas: [ ]
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

  it('should set totalLength, setTotalLength', () => {
    component.setTotalLength(1);
    expect(component.totalLength).toBe(1);
  });

  it('should set currentPointer, setCurrentPointer', () => {
    component.setCurrentPointer(1);
    expect(component.currentPointer).toBe(1);
  });

  it('should set answers, updateSurveyStatus', () => {
    const answers: [any] = [
      {
        question_id: '1',
        content: '',
      }
    ];
    component.updateSurveyStatus(answers);
    expect(component.answers).toEqual(answers);
  });
});
