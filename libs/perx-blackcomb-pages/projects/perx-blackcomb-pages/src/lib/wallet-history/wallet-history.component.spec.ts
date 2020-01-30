import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IVoucherService, VouchersModule, Voucher, VoucherState } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { WalletHistoryComponent } from './wallet-history.component';
import { of } from 'rxjs';
import { MatTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Type } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('WalletHistoryComponent', () => {
  let component: WalletHistoryComponent;
  let fixture: ComponentFixture<WalletHistoryComponent>;
  const voucher: Voucher[] = [
    {
      id: 1,
      reward: null,
      state: VoucherState.expired,
      expiry: new Date()
    }
  ];

  const router = {
    navigate: () => { }
  };
  const vouchersServiceStub: Partial<IVoucherService> = {
    getAll: () => of(),
    getFromPage: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WalletHistoryComponent],
      imports: [
        VouchersModule,
        RouterTestingModule,
        MatTabsModule,
        NoopAnimationsModule,
        InfiniteScrollModule
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: IVoucherService, useValue: vouchersServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to voucher detail on voucher selected', () => {
    const routerService: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
    const routerSpy = spyOn(routerService, 'navigate');
    component.voucherSelected(voucher[0]);
    expect(routerSpy).toHaveBeenCalledWith([`/voucher-detail/1`]);
  });
});
