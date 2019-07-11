import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeRedemptionComponent } from './qrcode-redemption.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VouchersModule } from '../vouchers.module';

describe('QrcodeRedemptionComponent', () => {
  let component: QrcodeRedemptionComponent;
  let fixture: ComponentFixture<QrcodeRedemptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        VouchersModule.forRoot({ env: { apiHost: '' } })
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
