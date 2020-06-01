import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationFilterPopupComponent } from './location-filter-popup.component';

import {
  MatDialogModule,
  MatIconModule,
  MatToolbarModule,
  MatCheckboxModule,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';

describe('LocationFilterPopupComponent', () => {
  let component: LocationFilterPopupComponent;
  let fixture: ComponentFixture<LocationFilterPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationFilterPopupComponent],
      imports: [MatDialogModule, MatIconModule, MatToolbarModule, MatCheckboxModule, TranslateModule.forRoot()],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: ['a', 'b'] },
        { provide: MatDialogRef, useValue: LocationFilterPopupComponent }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationFilterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
