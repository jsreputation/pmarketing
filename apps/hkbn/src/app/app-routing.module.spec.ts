import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { QrRedemptionModule } from './wallet/qr-redemption/qr-redemption.module';
import { NgModuleFactoryLoader } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VouchersModule, VouchersService, Voucher } from '@perx/core';
import { environment } from 'src/environments/environment';
import { NotificationWrapperService } from './services/notification-wrapper.service';
import { TranslateService } from '@ngx-translate/core';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { mockVoucher } from './wallet/voucher.mock';

const NotificationWrapperServiceStud = {
    addPopup: () => { }
};
const translateServiceStud = {
    defaultLang: null,
    setDefaultLang: function (leng) { this.defaultLang = leng },
    get: (str) => of(str instanceof Array ? str.reduce((ac, next) => {
        ac[next] = next;
        return ac
    }, {}) : str)
};
const vouchersServiceStub = {
    state: new BehaviorSubject(mockVoucher),
    get: (): Observable<Voucher> => of(mockVoucher),
    stateChangedForVoucher: (): Observable<Voucher> => vouchersServiceStub.state,
    redeemVoucher: (): Observable<any> => of({})
  };
fdescribe('AppRoutingModule', () => {
    let router: Router;
    let location: Location;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                QrRedemptionModule,
                VouchersModule.forRoot({ env: environment }),
                RouterTestingModule.withRoutes([
                    {
                        path: 'wallet/:id', children: [{
                            path: 'qrcode',
                            loadChildren: () => import('./wallet/qr-redemption/qr-redemption.module').then(mod => mod.QrRedemptionModule)
                        }]
                    }
                ])
            ],
            providers: [
                { provide: NotificationWrapperService, useValue: NotificationWrapperServiceStud },
                { provide: TranslateService, useValue: translateServiceStud },
                { provide: VouchersService, useValue: vouchersServiceStub }
            ]
        });
        router = TestBed.get(Router);
        location = TestBed.get(Location);
    });

    it('navigate to "lazy', fakeAsync(() => {
        const url = '/wallet/15/qrcode';
        const loader = TestBed.get(NgModuleFactoryLoader);
        loader.stubbedModules = { lazyModule: QrRedemptionModule };
        router.resetConfig([
            { path: 'wallet/:id/qrcode', loadChildren: () => import('./wallet/qr-redemption/qr-redemption.module').then(mod => mod.QrRedemptionModule) },
        ]);
        router.navigateByUrl(url)
        tick();
        expect(location.path()).toBe(url);
    }));
})