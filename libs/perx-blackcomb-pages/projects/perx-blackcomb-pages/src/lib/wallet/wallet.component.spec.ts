import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { WalletComponent } from './wallet.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  IVoucherService,
  VouchersModule,
  ICampaignService,
  NotificationService,
  Voucher,
  VoucherState,
  PuzzlesModule,
  ConfigService,
} from '@perxtech/core';
import { of } from 'rxjs';
import { MatCardModule, MatRippleModule, MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Type } from '@angular/core';
import { VoucherDetailComponent } from '../voucher-detail/voucher-detail.component';
import { Router } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('WalletComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;

  const voucher: Voucher[] = [
    {
      id: 1,
      reward: null,
      state: VoucherState.expired,
      expiry: new Date()
    }
  ];

  const vouchersServiceStub: Partial<IVoucherService> = {
    getFromPage: () => of([]),
    getAll: () => of([])
  };

  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of()
  };

  const notificationServiceStub: Partial<NotificationService> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WalletComponent,
        VoucherDetailComponent,
        // PuzzleListComponent,
        // RepeatTimesDirective
      ],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        VouchersModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([{
          path: 'voucher-detail/:id',
          component: VoucherDetailComponent
        }]),
        MatRippleModule,
        MatIconModule,
        PuzzlesModule,
        InfiniteScrollModule
      ],
      providers: [
        DatePipe,
        // { provide: Router, useValue: router },
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        {
          provide: ConfigService, useValue: {
            readAppConfig: () => of({}),
            getTenantAppSettings: (key: string) => of({ key }),
            getAccountSettings: () => { }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to voucher detail on voucher selected', () => {
    const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
    const routerSpy = spyOn(router, 'navigate');
    component.voucherSelected(voucher[0]);
    expect(routerSpy).toHaveBeenCalledWith(['/voucher-detail/1']);
  });

  it('should call voucher serivce after scroll', fakeAsync(() => {
    component.completed = false;
    component.currentPage = 0;
    const voucherService: IVoucherService = fixture.debugElement.injector.get<IVoucherService>(
      IVoucherService as Type<IVoucherService>
    );
    const voucherServiceSpy = spyOn(voucherService, 'getFromPage').and.returnValue(of(voucher));
    component.onScroll();
    expect(voucherServiceSpy).toHaveBeenCalled();
  }));
});
