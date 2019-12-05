import { AuthenticationService } from '@perx/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialogModule, MatToolbarModule, MatIconModule, MatSnackBarModule } from '@angular/material';

const authServiceStub = {};

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' }
        ]),
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        MatSnackBarModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: authServiceStub
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
