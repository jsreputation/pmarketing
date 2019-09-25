import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QRCodeComponent } from './qr-code.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { VouchersModule, IVoucherService } from '@perx/core';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

const ivoucherServiceStub = {
  get: () => of({})
};

describe('QrCodeComponent', () => {
  let component: QRCodeComponent;
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
