import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialogModule, MatDialog } from '@angular/material';
import {
  AuthenticationService,
  ProfileService,
  CampaignService,
  NotificationService,
  PopupComponent
} from '@perx/core';
import { of, Observable } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Type } from '@angular/core';

class MockNotificationService {
  get $popup(): Observable<any> {
    return of(true);
  }

  get $snack(): Observable<any> {
    return of(true);
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const authenticationServiceStub = {
    saveUserAccessToken: () => {}
  };
  const profileServiceStub = {
    whoAmI: () => of()
  };
  const campaignServiceStub = {};

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent,
        PopupComponent
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: CampaignService, useValue: campaignServiceStub },
        { provide: NotificationService, useClass: MockNotificationService },
        {
          provide: ActivatedRoute, useValue: {
            queryParams: of({ token: 'starhub' })
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog on init and saveUserAccessToken', () => {
    const notificationService = TestBed.get(NotificationService);
    const dialog = TestBed.get(MatDialog);

    const authenticationService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    const authSpy = spyOn(authenticationService, 'saveUserAccessToken');
    spyOnProperty(notificationService, '$popup', 'get')
      .and.returnValue(of({ title: 'Test' }));
    const openSpy = spyOn(dialog, 'open');

    fixture.detectChanges();
    expect(openSpy).toHaveBeenCalledWith(PopupComponent, { data: { title: 'Test' } });
    expect(authSpy).toHaveBeenCalled();
  });
});
