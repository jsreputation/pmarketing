import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import {
  NoopAnimationsModule,
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatIconModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule,
  MatTabsModule,
} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { TranslateModule } from '@ngx-translate/core';

import {
  DatePickerModule,
  UploadFileModule,
} from '@cl-shared';

import { ButtonModule } from '@perxtech/candyshop';

import { UpsertUserPopupComponent } from './upsert-user-popup.component';
import { AudiencesService, SurveyService } from '@cl-core-services';
import { MockAudienceService } from '@cl-shared/test-components/providers/mock-audience.service';
import { MockSurveyService } from '@cl-shared/test-components/providers/mock-survey.service';

describe('UpsertUserPopupComponent', () => {
  let component: UpsertUserPopupComponent;
  let fixture: ComponentFixture<UpsertUserPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        BrowserDynamicTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        DatePickerModule,
        MatTabsModule,
        ButtonModule,
        UploadFileModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: {
            close: () => {
            }
          }
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: AudiencesService, useClass: MockAudienceService },
        { provide: SurveyService, useClass: MockSurveyService },
      ],
      declarations: [UpsertUserPopupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
