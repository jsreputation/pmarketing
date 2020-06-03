import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {
  MatDialog,
  MatDialogModule,
  // MatSnackBar
} from '@angular/material';
import { NotificationService, PopupComponent, UtilsModule } from '@perxtech/core';
import { Observable, of } from 'rxjs';
import { SnackbarModule } from './ui/snackbar/snackbar.module';
// import { SnackbarComponent } from './ui/snackbar/snackbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Type } from '@angular/core';

class MockNotificationService {
  public get $popup(): Observable<any> {
    return of(true);
  }

  public get $snack(): Observable<any> {
    return of(true);
  }
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', redirectTo: '/' }
        ]),
        MatDialogModule,
        SnackbarModule,
        UtilsModule,
        NoopAnimationsModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: NotificationService, useClass: MockNotificationService }
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

  it('should open dialog when notificationService emits', () => {
    const notificationService = TestBed.get<NotificationService>(NotificationService as Type<NotificationService>);
    const dialog = TestBed.get<MatDialog>(MatDialog as Type<MatDialog>);

    jest.spyOn(notificationService, '$popup', 'get').mockReturnValue(of({ title: 'Test' }));
    const openSpy = spyOn(dialog, 'open');

    fixture.detectChanges();
    expect(openSpy).toHaveBeenCalledWith(PopupComponent, { data: { title: 'Test' } });
  });

  // it('should open snackbar when $snack emits', () => {
  //   const notificationService = TestBed.get(NotificationService);
  //   const snackBar = TestBed.get(MatSnackBar);

  //   spyOnProperty(notificationService, '$snack', 'get')
  //     .and.returnValue(of('Test'));

  //   const snackBarOpenSpy = spyOn(snackBar, 'openFromComponent');
  //   fixture.detectChanges();
  //   expect(snackBarOpenSpy).toHaveBeenCalledWith(SnackbarComponent, { data: { message: 'Test' } });
  // });
});
