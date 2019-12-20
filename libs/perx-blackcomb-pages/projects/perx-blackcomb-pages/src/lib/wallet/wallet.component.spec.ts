import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { WalletComponent } from './wallet.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  IVoucherService,
  VouchersModule,
  ICampaignService,
  StampService,
  NotificationService,
  ICampaign,
  CampaignType,
  CampaignState,
  IStampCard,
  StampCardState,
  Voucher,
  VoucherState
} from '@perx/core';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Type } from '@angular/core';
import { VoucherDetailComponent } from '../voucher-detail/voucher-detail.component';
import { Router } from '@angular/router';

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
    getAll: () => of([])
  };

  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of()
  };

  const stampServiceStub: Partial<StampService> = {
    getCurrentCard: () => of()
  };

  const notificationServiceStub: Partial<NotificationService> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WalletComponent,
        VoucherDetailComponent
      ],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        VouchersModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([{
          path: 'voucher-detail/:id',
          component: VoucherDetailComponent
        }])
      ],
      providers: [
        DatePipe,
        // { provide: Router, useValue: router },
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: StampService, useValue: stampServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub }
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

  it('should call getCampaignsSpy, stampServiceSpy, voucherServiceSpy onInit', fakeAsync(() => {
    const campaigns: ICampaign[] = [
      {
        id: 1,
        name: 'Test',
        description: 'Campaign Test',
        type: CampaignType.stamp,
        state: CampaignState.active,
        endsAt: new Date()
      }
    ];
    const stampCard: IStampCard = {
      id: 1,
      state: StampCardState.active,
      title: 'Test',
      campaignConfig: null,
      displayProperties: {
        numberOfCols: undefined,
        numberOfRows: undefined,
        cardImage: undefined,
        preStampImg: undefined,
        postStampImg: undefined,
        rewardPreStamp: undefined,
        rewardPostStamp: undefined,
        bgImage: undefined,
        cardBgImage: undefined,
        totalSlots: undefined,
        displayCampaignAs: '',
        backgroundImg: undefined,
        rewardPositions: undefined,
        thumbnailImg: undefined,
        noRewardsPopUp: undefined,
        successPopUp: undefined
      }
    };

    const campaignService: ICampaignService = fixture.debugElement.injector.get<ICampaignService>(
      ICampaignService as Type<ICampaignService>
    );
    const getCampaignsSpy = spyOn(campaignService, 'getCampaigns').and.returnValue(of(campaigns));

    const stampService: StampService = fixture.debugElement.injector.get<StampService>(
      StampService as Type<StampService>
    );
    const stampServiceSpy = spyOn(stampService, 'getCurrentCard').and.returnValue(of(stampCard));

    const voucherService: IVoucherService = fixture.debugElement.injector.get<IVoucherService>(
      IVoucherService as Type<IVoucherService>
    );
    const voucherServiceSpy = spyOn(voucherService, 'getAll').and.returnValue(of(voucher));

    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(getCampaignsSpy).toHaveBeenCalled();
    expect(stampServiceSpy).toHaveBeenCalled();
    expect(voucherServiceSpy).toHaveBeenCalled();
  }));

  it('should redirect to voucher detail on voucher selected', () => {
    const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
    const routerSpy = spyOn(router, 'navigate');
    component.voucherSelected(voucher[0]);
    expect(routerSpy).toHaveBeenCalledWith([`/voucher-detail/1`]);
  });
});
