import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VouchersModule, ConfigModule } from '@perx/core';

import { VoucherDetailComponent } from './voucher-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailHeaderModule } from 'src/app/details/detail-header/detail-header.module';
import { environment } from 'src/environments/environment';

describe('VoucherDetailComponent', () => {
  let component: VoucherDetailComponent;
  let fixture: ComponentFixture<VoucherDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherDetailComponent],
      imports: [
        ConfigModule.forRoot({...environment}),
        VouchersModule,
        HttpClientModule,
        RouterTestingModule,
        DetailHeaderModule
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
