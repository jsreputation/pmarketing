import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSurveyComponent } from './new-survey.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StampHttpService } from '@cl-core/http-services/stamp-http.service';
import { RoutingStateService } from '@cl-core/services';
import { StampDataService } from '../../../new-stamp/shared/stamp-data.service';
import { QuestionTypeModule } from '@cl-shared/components/question-type/question-type.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { QuestionFormFieldModule } from '@cl-shared/components/question-form-field/question-form-field.module';
import { SelectGraphicWrapModule } from '@cl-shared/components/select-graphic-wrap/select-graphic-wrap.module';
import { MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ConfirmModalModule } from '@cl-shared';

describe('NewSurveyPageComponent', () => {
  let component: NewSurveyComponent;
  let fixture: ComponentFixture<NewSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        QuestionTypeModule,
        ReactiveFormsModule,
        ButtonModule,
        QuestionFormFieldModule,
        SelectGraphicWrapModule,
        HttpClientTestingModule,

        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        DragDropModule,
        MatDialogModule,
        ConfirmModalModule,
      ],
      declarations: [ NewSurveyComponent ],
      providers: [
        {provide: StampHttpService, useValue: {
          getCardBackground: () => of([]),
          getBackground: () => of([]),
          }} ,
        {provide: RoutingStateService, useValue: {}},
        {
          provide: StampDataService, useValue: {}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
