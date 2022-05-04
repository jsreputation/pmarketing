import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthenticationService,
  ICampaignService,
  IGameService,
  Config,
  NotificationService,
  ConfigService,
  TokenStorage
} from '@perxtech/core';
import { of } from 'rxjs';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  const authenticationServiceStub: Partial<AuthenticationService> = {
    getUserAccessToken: () => '',
    autoLogin: () => of(),
    getAccessToken: () => of('')
  };

  const iCampaignSvcStub: Partial<ICampaignService> = {
    getCampaigns: () => of([]),
    getCampaign: () => of()
  };

  const iGameSvcStub: Partial<IGameService> = {};
  const configStub: Partial<Config> = {
    preAuth: false
  };
  const notificationServiceStub: Partial<NotificationService> = {
    addPopup: () => { }
  };

  const tokenStorageStub: Partial<TokenStorage> = {
    setAppInfoProperty: () => { }
  };

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of({
      redirectAfterLogin: '/home',
      apiHost: 'string',
      production: true,
      preAuth: true,
      isWhistler: true,
      baseHref: ''
    })
  };

  beforeEach(async(() => {
    const routerStub: Partial<Router> = { navigate: () => Promise.resolve(true) };

    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      imports: [
        MatProgressSpinnerModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: LoadingComponent },
          { path: 'login', component: LoadingComponent }
        ]),
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ICampaignService, useValue: iCampaignSvcStub },
        { provide: IGameService, useValue: iGameSvcStub },
        { provide: Router, useValue: routerStub },
        { provide: Config, useValue: configStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: convertToParamMap({ cid: 1, pi: 'jones' })
            }
          }
        },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: TokenStorage, useValue: tokenStorageStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    if ((window as any).primaryIdentifier) {
      delete (window as any).primaryIdentifier;
    }
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
