import { TestBed } from '@angular/core/testing';
import { NotificationWrapperService } from './notification-wrapper.service';
import { NotificationService } from '@perx/core';

describe('NotificationWrapperService', () => {
  let service: NotificationWrapperService;
  let notification: NotificationService;
  const notificationServiceStub: Partial<NotificationService> = {
    addPopup: (val) => val
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{
      provide: NotificationService, useValue: notificationServiceStub
    },
    NotificationWrapperService
    ]
  }));
  beforeEach(() => {
    notification = TestBed.get<NotificationService>(NotificationService);
    service = TestBed.get(NotificationWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call add popup from Notification', () => {
    const spy = spyOn(notification, 'addPopup');
    const config = {title: 'hello'};
    service.addPopup(config);
    expect(spy).toHaveBeenCalledWith(config);
  });
});
