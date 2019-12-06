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
  const vouchersServiceStub = {
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
});
