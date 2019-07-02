import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEngagementPopupComponent } from './create-engagement-popup.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material';

describe('CreateEngagementPopupComponent', () => {
  let component: CreateEngagementPopupComponent;
  let fixture: ComponentFixture<CreateEngagementPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEngagementPopupComponent ],
      imports: [
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEngagementPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
