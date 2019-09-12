import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SurveyModule as PerxSurveyModule, ConfigModule } from '@perx/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyComponent } from './survey.component';
import { MatCardModule, MatButtonModule, MatProgressBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('SurveyComponent', () => {
  let component: SurveyComponent;
  let fixture: ComponentFixture<SurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyComponent ],
      imports: [
        ConfigModule.forRoot({}),
        HttpClientTestingModule,
        MatCardModule,
        MatButtonModule,
        RouterTestingModule,
        MatProgressBarModule,
        PerxSurveyModule
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
