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

describe('PuzzlesComponent', () => {
  let component: PuzzlesComponent;
  let fixture: ComponentFixture<PuzzlesComponent>;
  const stampsServiceStub = {
    getCards: () => of([])
  };
  const authenticationServiceStub = {$failedAuth: of(true)};

  const configServiceStub = {
    readAppConfig: () => of()
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
        {provide: StampService, useValue: stampsServiceStub},
        {provide: AuthenticationService, useValue: authenticationServiceStub},
        { provide: ConfigService, useValue: configServiceStub}
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
