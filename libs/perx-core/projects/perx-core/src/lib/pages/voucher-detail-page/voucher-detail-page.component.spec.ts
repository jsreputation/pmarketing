import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherDetailPageComponent } from './voucher-detail-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { VouchersModule } from '../../vouchers/vouchers.module';
import { IVoucherService } from '../../vouchers/ivoucher.service';

describe('VoucherDetailPageComponent', () => {
  let component: VoucherDetailPageComponent;
  let fixture: ComponentFixture<VoucherDetailPageComponent>;
  const vouchersServiceStub = {

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherDetailPageComponent],
      imports: [
        RouterTestingModule,
        VouchersModule
      ],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
