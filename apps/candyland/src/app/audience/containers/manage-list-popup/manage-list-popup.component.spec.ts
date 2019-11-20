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
          {provide: MAT_DIALOG_DATA, useValue: {}}
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
