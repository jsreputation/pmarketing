import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { VouchersComponent } from './vouchers.component';
import { MatCardModule, MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { IVoucherService } from '@perxtech/core';
import { of } from 'rxjs';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';
import { Router } from '@angular/router';
import { Type } from '@angular/core';
import { vouchers } from '../../vouchers.mock';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('VouchersComponent', () => {
  let component: VouchersComponent;
  let fixture: ComponentFixture<VouchersComponent>;
  let router: Router;
  const vouchersServiceStub: Partial<IVoucherService> = {
    getAll: () => of(vouchers),
    getFromPage: () => of(vouchers)
  };

  const today = new Date();
  const tomorrow = new Date(today.getTime() + ((24 * 60 * 60 * 1000) * 1.1));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VouchersComponent],
      imports: [
        MatCardModule,
        MatIconModule,
        RouterTestingModule.withRoutes([{
          path: 'voucher',
          component: VouchersComponent
        }]),
        NgxMultiLineEllipsisModule,
        InfiniteScrollModule
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
    router = TestBed.get<Router>(Router as Type<Router>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on ngOnInit', fakeAsync(() => {
    const voucherService: IVoucherService = fixture.debugElement.injector.get<IVoucherService>
      (IVoucherService as Type<IVoucherService>);

    const voucherServiceSpy = spyOn(voucherService, 'getFromPage').and.returnValue(of(vouchers));
    component.ngOnInit();
    tick();
    expect(voucherServiceSpy).toHaveBeenCalled();
  }));

  it('should navigate', () => {
    const spyRouter = spyOn(router, 'navigate');
    component.voucherSelected(vouchers[0]);
    expect(spyRouter).toHaveBeenCalled();
  });

  it('should change status of hideSeeMore', () => {
    component.seeMoreClicked();
    expect(component.hideSeeMore).toBe(true);
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
