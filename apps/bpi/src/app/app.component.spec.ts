import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material';
import { MatDialog } from '@angular/material';
import { AuthenticationService, NotificationService } from '@perx/core';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Type } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let authenticationService: AuthenticationService;
  let fixture: ComponentFixture<AppComponent>;
  let notificationService: NotificationService;

  beforeEach(async(() => {
    const notificationServiceStub = { $popup: { subscribe: () => ({}) } };
    const matDialogStub = { open: () => ({}) };
    const authenticationServiceStub = { $failedAuth: of(true) };
    const routerStub = { navigateByUrl: () => ({}) };
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
        }
      ],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.get(AuthenticationService as Type<AuthenticationService>);
    notificationService = TestBed.get(NotificationService);
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
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      component.ngOnInit();
      expect(authenticationService.$failedAuth.value).toBe(true);
      expect(routerStub.navigateByUrl).toHaveBeenCalledWith('login');
    });

    it('should call notificationService', () => {
      notificationService.$popup.subscribe(res => {
        expect(res).toEqual({ title: 'Title', text: 'Body', buttonTxt: 'Button' });
      });
    });
  });
});
