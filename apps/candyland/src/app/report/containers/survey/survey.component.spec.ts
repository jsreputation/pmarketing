import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyComponent } from './survey.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CsvReportService, SurveyService } from '@cl-core-services';
import { MockSurveyService } from '@cl-shared/test-components/providers/mock-survey.service';

describe('SurveyComponent use', () => {
  let component: SurveyComponent;
  let fixture: ComponentFixture<SurveyComponent>;
  const csvReportServiceStub: Partial<CsvReportService> = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard/overview', redirectTo: '/' }
        ]),
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: CsvReportService, useValue: csvReportServiceStub },
        { provide: SurveyService, useClass: MockSurveyService }
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
