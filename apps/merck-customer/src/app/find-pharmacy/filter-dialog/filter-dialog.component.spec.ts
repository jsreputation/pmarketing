import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDialogComponent } from './filter-dialog.component';
import {
  MatDialogModule,
  MatIconModule,
  MatToolbarModule,
  MatCheckboxModule,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';

describe('FilterDialogComponent', () => {
  let component: FilterDialogComponent;
  let fixture: ComponentFixture<FilterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDialogComponent ],
      imports: [ MatDialogModule, MatIconModule, MatToolbarModule, MatCheckboxModule, TranslateModule.forRoot() ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: ['a', 'b']},
        {provide: MatDialogRef, useValue: FilterDialogComponent}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
