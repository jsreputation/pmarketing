import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { Type } from '@angular/core';
import { RedeemComponent } from './redeem.component';
import {
  InstantOutcomeService,
  IVoucherService,
  NotificationService,
  RedemptionType,
  Voucher,
  VouchersModule,
  VoucherState
} from '@perx/core';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';

const mockVoucher: Voucher = {
  id: 1,
  reward: {
    id: 1,
    name: 'reward name',
    description: 'reward description',
    subtitle: 'sub title',
    validFrom: new Date(),
    validTo: new Date(),
    rewardBanner: 'https://picsum.photos/50/50?random=1',
    termsAndConditions: '',
    displayProperties: {
      merchantPinText: {
        headLine: 'test headline',
        subHeadLine: 'test subHeadline',
        buttonTxt: 'btnText',
      },
      rewardSuccessPopUp: {
        headLine: 'test headline',
        subHeadLine: 'test subHeadline',
        buttonTxt: 'btnText',
      },
      codeInstructionsText: {
        headLine: 'test headline'
      },
      errorPopUp: {
        headLine: 'test error headline',
        subHeadLine: 'test error subHeadline',
        buttonTxt: 'error btnText',
      }
    },
  },
  redemptionType: RedemptionType.qr,
  state: VoucherState.issued,
  expiry: new Date('2019-09-05T03:24:00'),
};

describe('RedeemComponent', () => {
  let component: RedeemComponent;
  let fixture: ComponentFixture<RedeemComponent>;
  let router: Router;
  let location: Location;
  const vouchersServiceStub: Partial<IVoucherService> = {
    get: () => of(mockVoucher),
    stateChangedForVoucher: () => of(mockVoucher)
  };
  const outcomeServiceStub: Partial<InstantOutcomeService> = {
    getFromCampaign: () => of()
  };
  const notificationServiceStub: Partial<NotificationService> = {
    addPopup: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedeemComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login',  component: RedeemComponent },
          { path: 'wallet', redirectTo: '/' },
        ]),
        VouchersModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: InstantOutcomeService, useValue: outcomeServiceStub },
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: 1 })) } },
        { provide: NotificationService, useValue: notificationServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemComponent);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to wallet', () => {
    component.status = VoucherState.issued;
    mockVoucher.state = VoucherState.redeemed;
    const routerSpy = spyOn(router, 'navigate');

    component.ngOnInit();
    expect(routerSpy).toHaveBeenCalledWith(['wallet']);
  });

  // it('should call rewardSuccessPopup', () => {
  //   spyOn(component, 'popup');
  //   component.pinInputSuccess();
  //
  //   expect(component.popup).toHaveBeenCalled();
  // });

  it('should call addPopup', () => {
    const notificationService: NotificationService = fixture.debugElement.injector.get<NotificationService>(
      NotificationService as Type<NotificationService>);
    const popupSpy = spyOn(notificationService, 'addPopup');
    component.popup(component.rewardSuccessPopUp);

    expect(popupSpy).toHaveBeenCalled();
  });

  it('should location back', () => {
    spyOn(location, 'back');
    component.goBack();
    expect(location.back).toHaveBeenCalledTimes(1);
  });
});
