import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PinService } from './pin.service';
import { VouchersModule } from './vouchers.module';
import { VouchersService } from './vouchers.service';
import { of } from 'rxjs';
import { IVoucher, VoucherState, RedemptionType } from './models/voucher.model';

// const enum VoucherState {
//   issued = 'issued',
//   redeemed = 'redeemed',
//   expired = 'expired'
// }

// const enum RedemptionType {
//   pin = 'pin',
//   txtCode = 'txtCode',
//   none = 'none'
// }

describe('PinService', () => {
  let service: PinService;
  let vouchersService: VouchersService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        VouchersModule.forRoot({ env: { apiHost: '' } })
      ]
    }).compileComponents();
    service = TestBed.get(PinService);
    vouchersService = TestBed.get(VouchersService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get pin from voucher Id', (done: DoneFn) => {
    const mockReturn: IVoucher = {
      id: 1,
      rewardId: 52,
      state: VoucherState.expired,
      name: 'Vidyut what are you doing',
      code: '697974626635625878704f6750536e4b5231673762773d3d',
      redemptionType: RedemptionType.pin,
      thumbnailImg: '',
      rewardBanner: '',
      merchantImg: '',
      merchantName: 'Kluang Station',
      expiry: new Date('2019-04-30T15:59:59.999Z'),
      redemptionDate: new Date(),
      description: [{
        title: '',
        content: '',
        tag: []
      }],
      redemptionSuccessTxt: '',
      redemptionSuccessImg: ''
    };

    spyOn(vouchersService, 'get').and.returnValue(of(mockReturn));
    service.getPin(1)
      .subscribe(pinCode => {
        expect(pinCode).toBe('0052');
        done();
      });
  });

  it('should add 0 before if the id length is less than 4', () => {
    expect(service.generatePinCode('52')).toEqual('0052');
  });

  it('should take last 4 digits if id length is greater or equal than 4', () => {
    expect(service.generatePinCode('23152')).toEqual('3152');
  });

});
