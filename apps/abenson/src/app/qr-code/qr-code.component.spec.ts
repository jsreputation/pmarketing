import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';

import { QRCodeComponent } from './qr-code.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { VouchersModule, IVoucherService, NotificationService, VoucherState } from '@perxtech/core';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { vouchers } from '../mock/vouchers.mock';

const ivoucherServiceStub: Partial<IVoucherService> = {
  get: () => of()
};

describe('QrCodeComponent', () => {
  let component: QRCodeComponent;
  let notificationService: NotificationService;
  let fixture: ComponentFixture<QRCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QRCodeComponent],
      imports: [
        NgxBarcodeModule,
        VouchersModule,
        RouterTestingModule.withRoutes([{
          path: 'wallet',
          component: QRCodeComponent
        }])
      ],
      providers: [
        { provide: IVoucherService, useValue: ivoucherServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QRCodeComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.get<NotificationService>(NotificationService as Type<NotificationService>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addPopup after sucessRedeemed', () => {
    component.voucherState = VoucherState.issued;
    const notificationServiceSpy = spyOn(notificationService, 'addPopup');
    component.successRedeemed(vouchers[0]);
    expect(notificationServiceSpy).toHaveBeenCalled();
  });
});
