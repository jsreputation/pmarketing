import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material';
import { MatDialog } from '@angular/material';
import { AuthenticationService, NotificationService, ConfigService } from '@perx/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let notificationService: Partial<NotificationService>;

  beforeEach(async(() => {
    const notificationServiceStub: Partial<NotificationService> = { $popup: of() };
    const matDialogStub = { open: () => ({}) };
    const authenticationServiceStub: Partial<AuthenticationService> = { $failedAuth: of(true) };
    const routerStub: Partial<Router> = { navigateByUrl: () => new Promise((resolve) => resolve(true)) };
    const configServiceStub: Partial<ConfigService> = {
      readAppConfig: () => of()
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
      ],
      providers: [
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: MatDialog, useValue: matDialogStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: Router, useValue: routerStub },
        {
          provide: NotificationService,
          useValue: {
            $popup: of({
              title: 'Title',
              text: 'Body',
              buttonTxt: 'Button'
            })
          }
        },
        { provide: ConfigService, useValue: configServiceStub }
      ],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.get<NotificationService>(NotificationService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'bpi'`, () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('bpi');
  });

  describe('ngOnInit', () => {
    it('should pass auth login', () => {
      const routerStub: Partial<Router> = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      component.ngOnInit();
      expect(routerStub.navigateByUrl).toHaveBeenCalledWith('login');
    });

    it('should call notificationService', () => {
      notificationService.$popup.subscribe(res => {
        expect(res).toEqual({ title: 'Title', text: 'Body', buttonTxt: 'Button' });
      });
    });
  });
});
