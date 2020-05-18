import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { VoucherDetailComponent } from './voucher-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { IVoucherService, VouchersModule, Voucher, VoucherState } from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { Type } from '@angular/core';

describe('VoucherDetailComponent', () => {
  let component: VoucherDetailComponent;
  let fixture: ComponentFixture<VoucherDetailComponent>;
  const voucher: Voucher = {
    id: 1,
    reward: {
      id: 1,
      name: 'Reward',
      description: 'Reward',
      subtitle: 'Test',
      validFrom: new Date(),
      validTo: new Date(),
      rewardBanner: 'TEST',
      termsAndConditions: 'Test'
    },
    state: VoucherState.expired,
    expiry: new Date()
  };

  const vouchersServiceStub: Partial<IVoucherService> = {
    get: () => of()
  };

  const router = {
    navigate: () => { }
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
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: '1' })) } },
        { provide: Router, useValue: router },
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

  it('should call voucherService.get', fakeAsync(() => {
    const voucherService: IVoucherService = fixture.debugElement.injector.get<IVoucherService>(
      IVoucherService as Type<IVoucherService>
    );
    const voucherServiceSpy = spyOn(voucherService, 'get').and.returnValue(of(voucher));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(voucherServiceSpy).toHaveBeenCalled();
  }));

  it('should redirect to redeem onRedeem', fakeAsync(() => {
    component.voucher$ = of(voucher);
    const routerService: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
    const routerSpy = spyOn(routerService, 'navigate');
    component.onRedeem();
    tick();
    expect(routerSpy).toHaveBeenCalledWith(['redeem', 1]);
  }));
});
