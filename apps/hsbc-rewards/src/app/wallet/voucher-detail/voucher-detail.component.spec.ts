import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VouchersModule, IVoucherService } from '@perxtech/core';

import { VoucherDetailComponent } from './voucher-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailHeaderModule } from '../../details/detail-header/detail-header.module';
import { TranslateModule } from '@ngx-translate/core';

describe('VoucherDetailComponent', () => {
  let component: VoucherDetailComponent;
  let fixture: ComponentFixture<VoucherDetailComponent>;
  const voucherServiceStub: Partial<IVoucherService> = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherDetailComponent],
      imports: [
        VouchersModule,
        RouterTestingModule,
        DetailHeaderModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: IVoucherService, useValue: voucherServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
