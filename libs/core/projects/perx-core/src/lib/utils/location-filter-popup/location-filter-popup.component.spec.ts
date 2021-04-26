import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationFilterPopupComponent } from './location-filter-popup.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('LocationFilterPopupComponent', () => {
  let component: LocationFilterPopupComponent;
  let fixture: ComponentFixture<LocationFilterPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationFilterPopupComponent],
      imports: [MatDialogModule, MatIconModule, MatToolbarModule, MatCheckboxModule],
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
