import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersComponent } from './vouchers.component';
import { MatCardModule, MatRippleModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VouchersModule } from './vouchers.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('VouchersComponent', () => {
  let component: VouchersComponent;
  let fixture: ComponentFixture<VouchersComponent>;
  const mockRedeemedVoucherDetail = {
    description: 'Vidyut',
    id: 21,
    name: 'Vidyut what are you doing',
    expiresAt: null,
    state: 'redeemed',
    img: undefined,
  };

  const mockIssuedVoucherDetail = {
    description: 'Vidyut',
    id: 21,
    name: 'Vidyut what are you doing',
    expiresAt: null,
    state: 'issued',
    img: undefined,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatRippleModule,
        HttpClientTestingModule,
        RouterTestingModule,
        VouchersModule.forRoot({ env: { apiHost: '' } })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remain if voucher is redeemed', () => {
    spyOn(component.route, 'emit');
    component.onClick(mockRedeemedVoucherDetail);
    expect(component.route.emit).not.toHaveBeenCalled();
  });

  it('should emit with voucher id if voucher is issued', () => {
    spyOn(component.route, 'emit');
    component.onClick(mockIssuedVoucherDetail);
    expect(component.route.emit).toHaveBeenCalledWith(21);
  });

});
