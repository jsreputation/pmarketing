import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { QrRedemptionModule } from './wallet/qr-redemption/qr-redemption.module';
import { NgModuleFactoryLoader, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { VouchersModule, IVoucherService, Voucher } from '@perx/core';
import { NotificationWrapperService } from './services/notification-wrapper.service';
import { TranslateService } from '@ngx-translate/core';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { mockVoucher } from './wallet/voucher.mock';
import { routes } from './app-routing.module';
import { VoucherDetailsComponent } from './wallet/voucher-details/voucher-details.component';
import { CodeRedemptionModule } from './wallet/code-redemption/code-redemption.module';
import { RewardModule } from './reward/reward.module';
import { AccountModule } from './account/account.module';

const NotificationWrapperServiceStub = {
  addPopup: () => { }
};
const translateServiceStub = {
  defaultLang: null,
  setDefaultLang(leng: string): void { this.defaultLang = leng; },
  get: (str) => of(str instanceof Array ? str.reduce((ac, next) => {
    ac[next] = next;
    return ac;
  }, {}) : str)
};
const vouchersServiceStub = {
  state: new BehaviorSubject(mockVoucher),
  get: (): Observable<Voucher> => of(mockVoucher),
  stateChangedForVoucher: (): Observable<Voucher> => vouchersServiceStub.state,
  redeemVoucher: (): Observable<any> => of({})
};
describe('AppRoutingModule', () => {
  let router: Router;
  let location: Location;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        VoucherDetailsComponent
      ],
      imports: [
        CodeRedemptionModule,
        QrRedemptionModule,
        VouchersModule,
        RouterTestingModule.withRoutes([
          routes.find(el => el.path === '').children.find(el => el.path === 'wallet/:id'),
          routes.find(el => el.path === '').children.find(el => el.path === 'reward/:id'),
          routes.find(el => el.path === '').children.find(el => el.path === 'account'),
        ])
      ],
      providers: [
        { provide: NotificationWrapperService, useValue: NotificationWrapperServiceStub },
        { provide: TranslateService, useValue: translateServiceStub },
        { provide: IVoucherService, useValue: vouchersServiceStub }
      ]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  it('navigate to "lazy', fakeAsync(() => {
    let url = '/wallet/15/qrcode';

    // tslint:disable-next-line
    const loader = TestBed.get(NgModuleFactoryLoader as Type<NgModuleFactoryLoader>);

    loader.stubbedModules = { lazyModule: QrRedemptionModule };
    router.navigateByUrl(url);
    tick();
    expect(location.path()).toBe(url);

    url = '/wallet/15/code';
    loader.stubbedModules = { lazyModule: CodeRedemptionModule };
    router.navigateByUrl(url);
    tick();
    expect(location.path()).toBe(url);

    url = '/reward/15';
    loader.stubbedModules = { lazyModule: RewardModule };
    router.navigateByUrl(url);
    tick();
    expect(location.path()).toBe(url);

    url = '/account';
    loader.stubbedModules = { lazyModule: AccountModule };
    router.navigateByUrl(url);
    tick();
    expect(location.path()).toBe(url);
  }));
});
