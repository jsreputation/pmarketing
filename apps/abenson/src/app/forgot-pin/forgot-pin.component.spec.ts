import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Type } from '@angular/core';
import { Router, ActivatedRoute, Data, Params } from '@angular/router';
import { ForgotPinComponent } from './forgot-pin.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { AuthenticationService, UtilsModule, ConfigService, LoyaltyService, ILoyalty, ThemesService } from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

class ActivatedRouteMock implements Partial<ActivatedRoute> {
  public get queryParams(): Observable<Params> {
    return of();
  }
  public data: Observable<Data> = of();
}

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

const loyaltyServiceStub: Partial<LoyaltyService> = {
  getLoyalty: (): Observable<ILoyalty> => of(),
  getLoyalties: (): Observable<ILoyalty[]> => of([])
};

const themeServiceStub: Partial<ThemesService> = {
  getThemeSetting: () => of()
};

describe('ForgotPinComponent', () => {
  let component: ForgotPinComponent;
  let authenticationService: AuthenticationService;
  let fixture: ComponentFixture<ForgotPinComponent>;
  const router = {
    navigate: jest.fn()
  };
  const authenticationServiceStub: Partial<AuthenticationService> = {
    forgotPassword: () => of(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ForgotPinComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        UtilsModule,
        MatProgressSpinnerModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: ThemesService, useValue: themeServiceStub },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPinComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call forgotPassword after onSubmit', () => {
    const authenticationServiceSpy = spyOn(authenticationService, 'forgotPassword').and.callThrough();
    component.onSubmit();
    expect(authenticationServiceSpy).toHaveBeenCalled();
  });
});
