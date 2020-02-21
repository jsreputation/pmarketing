import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PuzzlesComponent} from './puzzles.component';
import {MatListModule} from '@angular/material';
import {
  CampaignModule,
  VouchersModule,
  PuzzlesModule,
  StampModule,
  StampService,
  AuthenticationService,
  ConfigService
} from '@perx/core';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {NavigateToolbarComponent} from '../navigate-toolbar/navigate-toolbar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute} from '@angular/router';

describe('PuzzlesComponent', () => {
  let component: PuzzlesComponent;
  let fixture: ComponentFixture<PuzzlesComponent>;
  const stampsServiceStub: Partial<StampService> = {
    getCards: () => of([])
  };
  const authenticationServiceStub: Partial<AuthenticationService> = {$failedAuth: of(true)};

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };

  const activatedRouteStub = {
    paramMap: of({
      get(): string {
        return '1';
      }
    }),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PuzzlesComponent,
        NavigateToolbarComponent
      ],
      imports: [
        MatListModule,
        PuzzlesModule,
        NoopAnimationsModule,
        CampaignModule,
        VouchersModule,
        StampModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: StampService, useValue: stampsServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
