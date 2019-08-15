import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialog, MatDialogModule, MatSnackBar } from '@angular/material';
import { NotificationService, PopupComponent, UtilsModule } from '@perx/core';
import { Observable, of } from 'rxjs';
import { SnackbarModule } from './ui/snackbar/snackbar.module';
import { SnackbarComponent } from './ui/snackbar/snackbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class MockNotificationService {
  get $popup(): Observable<any> {
    return of(true);
  }

  get $snack(): Observable<any> {
    return of(true);
  }
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
        SnackbarModule,
        UtilsModule,
        NoopAnimationsModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: NotificationService, useClass: MockNotificationService}
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
    const notificationService = TestBed.get(NotificationService);
    const dialog = TestBed.get(MatDialog);

    spyOnProperty(notificationService, '$popup', 'get')
      .and.returnValue(of({title: 'Test'}));
    const openSpy = spyOn(dialog, 'open');

    fixture.detectChanges();
    expect(openSpy).toHaveBeenCalledWith(PopupComponent, {data: {title: 'Test'}});
  });

  it('should open snackbar when $snack emits', () => {
    const notificationService = TestBed.get(NotificationService);
    const snackBar = TestBed.get(MatSnackBar);

    spyOnProperty(notificationService, '$snack', 'get')
      .and.returnValue(of('Test'));

    const snackBarOpenSpy = spyOn(snackBar, 'openFromComponent');
    fixture.detectChanges();
    expect(snackBarOpenSpy).toHaveBeenCalledWith(SnackbarComponent, {data: {message: 'Test'}});
  });
});
