import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VouchersModule } from '@perx/core';

import { VoucherDetailComponent } from './voucher-detail.component';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailHeaderModule } from 'src/app/details/detail-header/detail-header.module';

describe('VoucherDetailComponent', () => {
  let component: VoucherDetailComponent;
  let fixture: ComponentFixture<VoucherDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherDetailComponent],
      imports: [
        VouchersModule.forRoot({ env: environment }),
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
