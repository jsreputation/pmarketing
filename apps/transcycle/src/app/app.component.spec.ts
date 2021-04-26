import {
  AuthenticationService,
  ConfigService,
  ICampaignService,
  ThemesService,
  TokenStorage
} from '@perxtech/core';
import {
  async,
  TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

const authServiceStub: Partial<AuthenticationService> = {};
const campaignServiceStub: Partial<ICampaignService> = {
  getCampaigns: () => of(),
  getCampaign: () => of(),
};
const tokenStorageStub: Partial<TokenStorage> = {
  getAppInfoProperty: () => undefined,
  setAppInfoProperty: () => { }
};
const themesServiceStub: Partial<ThemesService> = { getThemeSetting: () => of() };

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
        MatSnackBarModule,
        MatIconModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: authServiceStub
        },
        {
          provide: TranslateService,
          useValue: {
            getTranslation: () => of()
          }
        }, {
          provide: ConfigService,
          useValue: {
            readAppConfig: () => of()
          }
        },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: TokenStorage, useValue: tokenStorageStub },
        { provide: ThemesService, useValue: themesServiceStub },

      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
