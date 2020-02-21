import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RedeemComponent } from './redeem.component';
import { VouchersModule, IVoucherService } from '@perx/core';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { QRCodeComponent } from '../qr-code/qr-code.component';
import { NgxBarcodeModule } from 'ngx-barcode';
// import { of } from 'rxjs';

describe('RedeemComponent', () => {
  let component: RedeemComponent;
  let fixture: ComponentFixture<RedeemComponent>;
  const vouchersServiceStub: Partial<IVoucherService> = {
    // getAll: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedeemComponent, QRCodeComponent],
      imports: [
        RouterTestingModule,
        MatDialogModule,
        VouchersModule,
        NgxBarcodeModule
      ],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open popup after pinInputSuccess', () => {
    const popupSpy = spyOn(component, 'popup');
    component.voucherId = 0;
    component.pinInputSuccess();
    expect(popupSpy).toHaveBeenCalledWith({
      title: 'Redeem Successfully',
      text: 'ID: 0',
    });
  });

  it('should call needLoginPopup if status === 401, errorHandler', () => {
    const needLoginPopupSpy = spyOn(component, 'needLoginPopup');
    component.errorHandler(401);
    expect(needLoginPopupSpy).toHaveBeenCalled();
  });

  it('should call errorPopup if status !== 401, errorHandler', () => {
    const errorPopupSpy = spyOn(component, 'errorPopup');
    component.errorHandler(400);
    expect(errorPopupSpy).toHaveBeenCalled();
  });
});
