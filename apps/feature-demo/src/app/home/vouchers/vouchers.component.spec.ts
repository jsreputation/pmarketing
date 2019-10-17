import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersComponent } from './vouchers.component';
import { MatCardModule, MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { IVoucherService } from '@perx/core';
import { of } from 'rxjs';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';
import { vouchers } from '../../vouchers.mock';
import { Router } from '@angular/router';

describe('VouchersComponent', () => {
  let component: VouchersComponent;
  let fixture: ComponentFixture<VouchersComponent>;
  const vouchersServiceStub = {
    getAll: () => of()
  };

  const today = new Date();
  const tomorrow = new Date(today.getTime() + ((24 * 60 * 60 * 1000) * 1.1));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VouchersComponent],
      imports: [
        MatCardModule,
        MatIconModule,
        RouterTestingModule,
        NgxMultiLineEllipsisModule
      ],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceStub }
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

  it('should navigate to voucher detail', () => {
    const routerFixture: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(routerFixture, 'navigate');
    component.voucherSelected(vouchers[0]);
    expect(routerSpy).toHaveBeenCalled();
  });

  it('should change hideMore flag value', () => {
    component.seeMoreClicked();
    expect(component.hideSeeMore).toBeTruthy();
  });

  it('difference should be 1 with next day', () => {
    const mockVoucher = vouchers[0];
    mockVoucher.expiry = tomorrow;
    const noOfDays = component.getNumberOfDays(mockVoucher);
    expect(noOfDays).toBe('Expires in 1 days');
  });

  it('should apply less-three-days with next day', () => {
    const mockVoucher = vouchers[0];
    mockVoucher.expiry = tomorrow;
    const textColorClass = component.getTextColorClass(mockVoucher);
    expect(textColorClass).toBe('less-three-days');
  });

});
