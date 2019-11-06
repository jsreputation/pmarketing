import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService, ICampaignService, IGameService, Config } from '@perx/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const configStub: Partial<Config> = {
  preAuth: false
};

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  const authenticationServiceStub: Partial<AuthenticationService> = {
    getUserAccessToken: () => '',
    autoLogin: () => of()
  };

  const iCampaignSvcStub: Partial<ICampaignService> = {
    getCampaigns: () => of([]),
    getCampaign: () => of()
  };

  const iGameSvcStub: Partial<IGameService> = {};

  beforeEach(async(() => {
    const routerStub: Partial<Router> = { navigate: () => Promise.resolve(true) };

    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      imports: [
        MatProgressSpinnerModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ICampaignService, useValue: iCampaignSvcStub },
        { provide: IGameService, useValue: iGameSvcStub },
        { provide: Router, useValue: routerStub },
        { provide: Config, useValue: configStub }
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
