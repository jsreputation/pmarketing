import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersComponent, PopupType } from './vouchers.component';
import { VouchersModule, IVoucherService, RewardsService, IMerchantsService } from '@perx/core';
import { MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { MatDialogStub } from 'src/testing/mat-dialog-stub';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('VouchersComponent', () => {
  let component: VouchersComponent;
  let fixture: ComponentFixture<VouchersComponent>;

  const activatedRouteStub = new ActivatedRouteStub();
  const matDialogStub = new MatDialogStub();
  const voucherServiceStub = {
    get: () => of(''),
    getAll: () => of('')
  };

  const rewardsServiceStub = {
    getReward: () => of()
  };

  const merchantsServiceStub = {
    getMerchant: () => of()
  };

  const navigateSpy: jest.Mock = jest.fn();
  const routerStub: Partial<Router> = {
    navigate: navigateSpy
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VouchersComponent],
      imports: [
        NoopAnimationsModule,
        VouchersModule
      ],
      providers: [
        DatePipe,
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: MatDialog, useValue: matDialogStub },
        {
          provide: IMerchantsService, useValue: merchantsServiceStub
        },
        { provide: IVoucherService, useValue: voucherServiceStub },
        { provide: RewardsService, useValue: rewardsServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    navigateSpy.call.reset();
  });

  afterEach(() => {
    navigateSpy.calls.reset();
    activatedRouteStub.setParamMap({});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to voucher page', () => {
    component.onRoute('234');
    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/vouchers/234']);
  });

  it('should open completed dialog', () => {
    activatedRouteStub.setParamMap({ popup: PopupType.completed });
    component.ngOnInit();
    expect(matDialogStub.params.data.title).toBe('You\'ve already completed the game');
  });

  it('should open expired dialog', () => {
    activatedRouteStub.setParamMap({ popup: PopupType.expired });
    component.ngOnInit();
    expect(matDialogStub.params.data.title).toBe('We\'re sorry, the treats have expired');
  });

  it('should open 404 dialog', () => {
    activatedRouteStub.setParamMap({ popup: PopupType.four0four });
    component.ngOnInit();
    expect(matDialogStub.params.data.title).toBe('What you are looking for does not exist');
  });
});
