import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageListPopupComponent } from './manage-list-popup.component';
import {
  MatTableModule,
  MatIconModule,
  MatDialogModule,
  MatCheckboxModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { ButtonModule } from '@cl-shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AudiencesService } from '@cl-core-services';
import { MockAudienceService } from '@cl-shared/test-components/providers/mock-audience.service';

describe('ManageListPopupComponent', () => {
  let component: ManageListPopupComponent;
  let fixture: ComponentFixture<ManageListPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          MatTableModule,
          MatIconModule,
          MatDialogModule,
          ButtonModule,
          MatCheckboxModule,
          HttpClientTestingModule,
          TranslateModule.forRoot(),
        ],
        providers: [
          {
            provide: MatDialogRef, useValue: {
              close: () => {
              }
            }
          },
          {provide: MAT_DIALOG_DATA, useValue: {}},
          {provide: AudiencesService, useClass: MockAudienceService }
        ],
        declarations: [ManageListPopupComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
