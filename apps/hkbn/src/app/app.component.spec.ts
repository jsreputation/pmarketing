import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialog, MatDialogModule } from '@angular/material';
import { NotificationService, PopupComponent } from '@perx/core';
import { Observable, of } from 'rxjs';

class MockNotificationService {
  get $popup(): Observable<any> {
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
});
