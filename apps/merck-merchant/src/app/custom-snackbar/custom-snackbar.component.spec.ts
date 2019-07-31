import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSnackbarComponent } from './custom-snackbar.component';
import { MatIconModule } from '@angular/material';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material';

describe('CustomSnackbarComponent', () => {
  let component: CustomSnackbarComponent;
  let fixture: ComponentFixture<CustomSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSnackbarComponent ],
      imports: [ MatIconModule ],
      providers: [
        {provide: MatSnackBar, useValue: {}},
        {provide: MAT_SNACK_BAR_DATA, useValue:
          {
            data: {
              message: 'test',
              icon: 'clear',
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
