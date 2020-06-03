import { AuthenticationService, ConfigService } from '@perxtech/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialogModule, MatToolbarModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

const authServiceStub: Partial<AuthenticationService> = {};

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' },
          { path: 'login', redirectTo: '/' }
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
        }, {
          provide: TranslateService,
          useValue: {
            getTranslation: () => of()
          }
        }, {
          provide: ConfigService,
          useValue: {
            readAppConfig: () => of()
          }
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
