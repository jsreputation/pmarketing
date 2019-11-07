import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VoucherDetailComponent } from './voucher-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { IVoucherService, VouchersModule } from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

describe('VoucherDetailComponent', () => {
  let component: VoucherDetailComponent;
  let fixture: ComponentFixture<VoucherDetailComponent>;
  const vouchersServiceStub: Partial<IVoucherService> = {

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherDetailComponent],
      imports: [
        RouterTestingModule,
        VouchersModule,
        TranslateModule.forRoot()
      ],
      providers: [
        DatePipe,
        { provide: IVoucherService, useValue: vouchersServiceStub }
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
