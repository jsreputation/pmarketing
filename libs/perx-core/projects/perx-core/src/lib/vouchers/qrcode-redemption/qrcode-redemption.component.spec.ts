import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeRedemptionComponent } from './qrcode-redemption.component';
import { VouchersModule } from '../vouchers.module';
import { ConfigModule } from './../../config/config.module';
import { IVoucherService } from '../ivoucher.service';
import { of } from 'rxjs';

describe('QrcodeRedemptionComponent', () => {
  let component: QrcodeRedemptionComponent;
  let fixture: ComponentFixture<QrcodeRedemptionComponent>;
  const voucherServiceStub = {
    get: () => {
      return of('');
    },
    getAll: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        VouchersModule,
        ConfigModule.forRoot({})
        ],
      providers: [
        { provide: IVoucherService, useValue: voucherServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodeRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
