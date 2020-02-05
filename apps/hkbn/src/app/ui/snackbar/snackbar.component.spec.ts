import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarComponent } from './snackbar.component';
import {
  MAT_SNACK_BAR_DATA,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatSnackBarRef
} from '@angular/material';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule
      ],
      providers: [{
        provide: MatSnackBarRef, useValue: {
          dismiss: () => {
          }
        }
      },
      {
        provide: MAT_SNACK_BAR_DATA, useValue: {
          message: 'test'
        }
      }],
      declarations: [SnackbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
